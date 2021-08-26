import { Component, OnInit } from "@angular/core";
import { UserModel } from "../authentication.class";
import { ToastrService } from "ngx-toastr";
import { CoreHelperService } from "src/app/core/core-helper.service";
import { Router } from "@angular/router";
import { AppConstant } from 'src/app/app.constant';

@Component({
  selector: "app-auth-signup",
  templateUrl: "./auth-signup.component.html",
  styleUrls: ["./auth-signup.component.scss"],
})
export class AuthSignupComponent implements OnInit {
  userModel: UserModel = new UserModel();
  hide: boolean = true;
  constructor(
    private toaster: ToastrService,
    private coreHelperService: CoreHelperService,
    private router: Router
  ) { }
  ngOnInit() { }
  onSubmit() {
    if (!!localStorage.getItem("UserList")) {
      const userList = <Array<UserModel>>(
        JSON.parse(localStorage.getItem("UserList"))
      );
      if (userList.length >= 1) {
        if (!userList.some((l) => l.email === this.userModel.email)) {
          this.createUser(userList);
        } else {
          this.toaster.error(AppConstant.MESSAGES.DUPLICATE_EMAIL);
        }
      }
    } else {
      this.createUser([]);
    }
  }
  createUser(userList: Array<UserModel>) {
    this.userModel.id = this.coreHelperService.generateGUID();
    this.userModel.userType = "Employee";
    userList.push(this.userModel);
    localStorage.setItem("UserList", JSON.stringify(userList));
    this.toaster.success(AppConstant.MESSAGES.USER_CREATE_SUCCESS, "Success");
    this.router.navigate(["/auth/signin"]);
  }
}
