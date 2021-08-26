import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ViewEncapsulation,
} from "@angular/core";
import * as _ from "lodash";

import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { CoreHelperService } from "src/app/core/core-helper.service";
import { EmployeesModel } from "../employees.class";
import { NgbDatepickerConfig } from "@ng-bootstrap/ng-bootstrap";
import { AppConstant } from 'src/app/app.constant';

@Component({
  selector: "app-employee-add",
  templateUrl: "./employee-manage.component.html",
  styleUrls: ["./employee-manage.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class EmployeesManageAddComponent
  implements OnInit, AfterViewInit, OnDestroy {
  employeeModel: EmployeesModel = new EmployeesModel();
  title: string = "Add Employee";
  placement = "top";
  isEdit: boolean = false;
  minDate: any = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
  };
  constructor(
    private router: Router,
    private toaster: ToastrService,
    private coreHelperService: CoreHelperService,
    private configDate: NgbDatepickerConfig
  ) { }
  ngOnInit(): void {
    this.employeeModel.gender = "";
    this.employeeModel.isActive = true;
    this.employeeModel.birthDate = {
      day: 1,
      month: 1,
      year: 2000,
    };
  }
  ngAfterViewInit(): void { }
  ngOnDestroy(): void { }
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
  onSubmit() {
    debugger;
    if (!!localStorage.getItem("UserList")) {
      const userList = <Array<EmployeesModel>>(
        JSON.parse(localStorage.getItem("UserList"))
      );
      if (userList.length >= 1) {
        if (
          !userList.some(
            (l) =>
              l.email === this.employeeModel.email && l.userType === "Employee"
          )
        ) {
          this.create(userList);
        } else {
          this.toaster.error(AppConstant.MESSAGES.INVALID_CREDENTIAL);
        }
      }
    } else {
      this.create([]);
    }
  }
  private create(userList: Array<EmployeesModel>) {
    this.employeeModel.id = this.coreHelperService.generateGUID();
    this.employeeModel.userType = "Employee";
    userList.push(this.employeeModel);
    localStorage.setItem("UserList", JSON.stringify(userList));
    this.toaster.success(
      AppConstant.MESSAGES.EMPLOYEE_CREATE_SUCCESS,
      "Success"
    );
    this.back();
  }
  back() {
    this.router.navigate(["/employees"]);
  }
}
