import {
  Component,
  ViewEncapsulation,
  OnInit,
} from "@angular/core";
import { Router } from '@angular/router';
import { AppConstant } from 'src/app/app.constant';

@Component({
  selector: "header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class Header implements OnInit {

  IsshowNav = false;
  isEmployeeLoggedIn: boolean = false;
  loggedInUser = {};
  isCheckIn: boolean = false;
  constructor(private router: Router) {
  }
  ngOnInit(): void {
    if (!!localStorage.getItem("IsCheckIn")) {
      this.isCheckIn = localStorage.getItem("IsCheckIn") === "true" ? true : false;
    }
    if (!!localStorage.getItem("IsEmployeeLoggedIn") && localStorage.getItem("IsEmployeeLoggedIn") == "true") {
      this.loggedInUser = JSON.parse(localStorage.getItem("LoggedInUser"));
      this.isEmployeeLoggedIn = true;
    } else {
      this.isEmployeeLoggedIn = false;
    }
  }

  checkIn() {
    this.viewMap();
    localStorage.setItem("IsCheckIn", "true");
    this.isCheckIn = true;
  }
  checkOut() {
    localStorage.setItem("IsCheckIn", "false");
    this.isCheckIn = false;
  }
  viewMap() {
    window.open(AppConstant.SYSTEM_SERVER_LINK + "emp-landing/checkin", "_blank");
  }
  logout() {
    localStorage.removeItem("IsEmployeeLoggedIn");
    localStorage.removeItem("LoggedInUser");
    this.router.navigate(['/auth/signin']);
  }
}
