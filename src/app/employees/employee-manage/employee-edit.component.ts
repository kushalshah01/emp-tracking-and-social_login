import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ViewEncapsulation,
} from "@angular/core";
import * as _ from "lodash";
import { EmployeesModel } from "../employees.class";
import { Router, ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";

import { AppConstant } from 'src/app/app.constant';

@Component({
  selector: "app-employee-edit",
  templateUrl: "./employee-manage.component.html",
  styleUrls: ["./employee-manage.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class EmployeesManageEditComponent
  implements OnInit, AfterViewInit, OnDestroy {
  employeeModel: EmployeesModel = new EmployeesModel();
  placement = "top";
  isEdit: boolean = true;
  title: string = "Update Employee";
  minDate: any = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate()
  };
  constructor(
    private router: Router,
    private toaster: ToastrService,
    private activatedRoute: ActivatedRoute,
  ) { 
    debugger;
  }
  ngOnInit(): void {
    this.employeeModel.gender = "";
    this.employeeModel.isActive = true;
    this.employeeModel.birthDate = {
      day: 1,
      month: 1,
      year: 2000,
    };
    this.initEmployeeData();
  }
  changeListener = (file: FileList) => {
    let fileUpload = file.item(0);
    if (fileUpload.size > 1000000) {
      this.toaster.error("File size muse be less then 1MB", "Failed");
      return;
    } else {
      var myReader = new FileReader();
      myReader.onload = (e: any) => {
        this.employeeModel.profileImage = e.target.result;
      }
      myReader.readAsDataURL(fileUpload);
    }
  }
  initEmployeeData() {
    const employeeId = this.activatedRoute.snapshot.params["id"];
    if (!!localStorage.getItem("UserList")) {
      this.employeeModel = this.getEmployeeList().find(
        (data) => data.id === employeeId
      );
      if (!this.employeeModel.birthDate) {
        this.employeeModel.birthDate = {
          day: 1,
          month: 1,
          year: 2000,
        };
      }
      if (!this.employeeModel.gender) {
        this.employeeModel.gender = "";
      }
      if (!!this.employeeModel.mobileNumber) {
        this.employeeModel.mobileNumber = this.employeeModel.mobileNumber.number;
      }
    }
  }
  ngAfterViewInit(): void { }
  ngOnDestroy(): void { }
  onSubmit() {
    let emloyeeList = this.getEmployeeList();
    if (emloyeeList.length >= 1) {
      _.each(emloyeeList, (list) => {
        if (list.id === this.employeeModel.id) {
          list = Object.assign(list, this.employeeModel);
        }
      });
      localStorage.setItem("UserList", JSON.stringify(emloyeeList));
      this.toaster.success(
        AppConstant.MESSAGES.RECORD_UPDATE_SUCCESS,
        "Success"
      );
      this.back();
    }
  }
  private getEmployeeList() {
    if (!!localStorage.getItem("UserList")) {
      return <Array<EmployeesModel>>(
        JSON.parse(localStorage.getItem("UserList"))
      );
    }
  }
  back() {
    this.router.navigate(["/employees"]);
  }
}
