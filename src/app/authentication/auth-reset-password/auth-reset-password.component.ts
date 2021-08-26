import { Component, OnInit } from "@angular/core";
import Swal from "sweetalert2";
import { AuthenticationService } from "../authntication.service";
import { Router } from "@angular/router";
import { UserModel } from "../authentication.class";
import { ToastrService } from "ngx-toastr";
import { AppConstant } from 'src/app/app.constant';

@Component({
  selector: "app-auth-reset-password",
  templateUrl: "./auth-reset-password.component.html",
  styleUrls: ["./auth-reset-password.component.scss"],
})
export class AuthResetPasswordComponent implements OnInit {
  userEmail: string = "";
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private toaster: ToastrService
  ) { }

  ngOnInit() { }

  onSubmit() {
    if (!!localStorage.getItem("UserList")) {
      const userList = <Array<UserModel>>(
        JSON.parse(localStorage.getItem("UserList"))
      );
      if (userList.length >= 1) {
        if (userList.some((l) => l.email === this.userEmail)) {
          const item = userList.find((l) => l.email === this.userEmail);
          Swal.fire(
            "Verified!",
            AppConstant.MESSAGES.EMAIL_VERIFY,
            "success"
          );
          this.router.navigate(["/auth/change-pass/" + item.id]);
        } else {
          this.toaster.error(AppConstant.MESSAGES.CHECK_EMAIL);
        }
      } else {
        this.toaster.error(AppConstant.MESSAGES.CHECK_EMAIL);
      }
    } else {
      this.toaster.error(AppConstant.MESSAGES.CHECK_EMAIL);
    }
  }
}
