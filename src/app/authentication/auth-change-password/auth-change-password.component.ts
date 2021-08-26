import { Component, OnInit } from "@angular/core";
import { ChangePasswordModel, UserModel } from "../authentication.class";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthenticationService } from "../authntication.service";
import { ToastrService } from "ngx-toastr";
import { AppConstant } from 'src/app/app.constant';

@Component({
  selector: "app-auth-change-password",
  templateUrl: "./auth-change-password.component.html",
  styleUrls: ["./auth-change-password.component.scss"],
})
export class AuthChangePasswordComponent implements OnInit {
  changePassModel = new ChangePasswordModel();
  hide: boolean = true;
  userDetails = new UserModel();

  constructor(
    private activatedRoute: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private toaster: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initUserData();
  }

  initUserData = () => {
    const userId = this.activatedRoute.snapshot.params["id"];
    if (!!userId && userId !== "") {
      let userList = this.getUserList();
      this.userDetails = userList.find((d) => d.id === userId);
    }
  };

  onSubmit() {
    let userList = this.getUserList().filter((f) => {
      return f.id !== this.userDetails.id;
    });
    this.userDetails = Object.assign(this.userDetails, this.changePassModel);
    userList.push(this.userDetails);
    localStorage.setItem("UserList", JSON.stringify(userList));
    this.toaster.success(
      AppConstant.MESSAGES.PASSWORD_RESET_SUCCESS,
      "Success"
    );
    this.router.navigate(["/"]);
  }
  getUserList() {
    if (!!localStorage.getItem("UserList")) {
      return <Array<UserModel>>JSON.parse(localStorage.getItem("UserList"));
    }
  }
}
