import { Component, OnInit } from "@angular/core";
import { UserLoginModel, UserModel } from "../authentication.class";
import {
  AuthService,
  GoogleLoginProvider,
  FacebookLoginProvider,
} from "angularx-social-login";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { CoreHelperService } from "src/app/core/core-helper.service";
import { AppConstant } from 'src/app/app.constant';
import { Core } from 'src/app/core/core.class';

@Component({
  selector: "app-auth-signin",
  templateUrl: "./auth-signin.component.html",
  styleUrls: ["./auth-signin.component.scss"],
})
export class AuthSigninComponent implements OnInit {
  loggedIn: boolean;
  loginModel: UserLoginModel = new UserLoginModel();

  constructor(
    private authService: AuthService,
    private router: Router,
    private coreHelperService: CoreHelperService
  ) { }
  ngOnInit() { }
  onSubmit() {
    if (
      this.loginModel.UserName ===
      AppConstant.DEFAULT_MANAGER.USER_NAME &&
      this.loginModel.Password === AppConstant.DEFAULT_MANAGER.PASSWORD
    ) {
      localStorage.setItem("IsLoggedIn", "true");
      const employeeList = Core.EmployeeList;
      const premisesList = Core.PremisesList;
      localStorage.setItem("PremiseList", JSON.stringify(premisesList));
      localStorage.setItem("UserList", JSON.stringify(employeeList));
      this.router.navigate(["/employees"]);
    } else {
      if (!!localStorage.getItem("UserList")) {
        const userList = <Array<UserModel>>(
          JSON.parse(localStorage.getItem("UserList"))
        );
        if (userList.length >= 1) {
          if (
            userList.some(
              (l) =>
                l.email === this.loginModel.UserName &&
                l.password === this.loginModel.Password
            )
          ) {
            // go to employee dashboard..
            localStorage.setItem("IsEmployeeLoggedIn", "true");
            let user = userList.find(user => user.email === this.loginModel.UserName
              && user.password == this.loginModel.Password);
            localStorage.setItem("LoggedInUser", JSON.stringify(user));
            this.router.navigate(['/emp-landing']);

          } else {
            Swal.fire(
              "Oops...",
              AppConstant.MESSAGES.INVALID_CREDENTIAL,
              "error"
            );
          }
        }
      } else {
        Swal.fire(
          "Oops...",
          AppConstant.MESSAGES.INVALID_CREDENTIAL,
          "error"
        );
      }
    }
  }
  signInWithGoogle() {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((x) => {
        const gUser: any = this.assignProperty(x);
        this.afterGFSinIn(gUser);
      }).catch(e => {
        console.log(e);
      });
  }
  signInWithFB() {
    this.authService
      .signIn(FacebookLoginProvider.PROVIDER_ID)
      .then((x: any) => {
        const fUser = this.assignProperty(x);
        this.afterGFSinIn(fUser);
      }).catch(e => {
        console.log(e);
      });
  }

  private assignProperty(x) {
    return {
      email: x.email,
      firstName: x.firstName,
      lastName: x.lastName,
      password: x.id,
      profileImage: x.photoUrl,
      isActive: true,
    };
  }

  private afterGFSinIn(user) {
    user["userType"] = "Employee";
    if (!!localStorage.getItem("UserList")) {
      const userList = <Array<UserModel>>(
        JSON.parse(localStorage.getItem("UserList"))
      );
      if (!userList.some((l) => l.email === user.email)) {
        this.createUser(userList, user);
      } else {
        this.navigateTo(userList.find((f) => f.email === user.email).userType,
          user);
      }
    } else {
      this.createUser([], user);
    }
  }
  private createUser(userList: Array<UserModel>, newUser) {
    newUser["id"] = this.coreHelperService.generateGUID();
    userList.push(newUser);
    localStorage.setItem("UserList", JSON.stringify(userList));
    this.navigateTo(newUser.userType, newUser);
  }
  navigateTo(userType, user) {
    if (userType === "Employee") {
      localStorage.setItem("IsEmployeeLoggedIn", "true");
      localStorage.setItem("LoggedInUser", JSON.stringify(user));
      this.router.navigate(["/emp-landing"]);
    } else {
    }
  }
}
