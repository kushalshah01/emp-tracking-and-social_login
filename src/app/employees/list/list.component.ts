import {
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
  AfterViewInit,
} from "@angular/core";
import { Subject } from "rxjs";
import { DataTableDirective } from "angular-datatables";
import { ToastrService } from "ngx-toastr";
import * as _ from "lodash";
import { CoreHelperService } from "src/app/core/core-helper.service";
import { EmployeesModel } from "../employees.class";
import { UserModel } from "src/app/authentication/authentication.class";
import Swal from "sweetalert2";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeDetailComponent } from '../detail/detail.component';
import { AppConstant } from 'src/app/app.constant';
import { Router } from '@angular/router';

@Component({
  selector: "app-employee-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class EmployeeListComponent implements OnInit, AfterViewInit, OnDestroy {
  employeeList: EmployeesModel[] = [];
  dtOptions: DataTables.Settings | any = {
    ordering: true,
    order: [],
    responsive: true,
    // dom: 'lBfrtip',
    // buttons: [
    //   'excel'
    // ],
    columnDefs: [
      {
        targets: [1, 4, 5] /* column index */,
        orderable: false /* true or false */,
      },
    ],
  };
  dtTrigger = new Subject();
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  constructor(
    private toastr: ToastrService,
    private coreHelperService: CoreHelperService,
    private modalService: NgbModal,
    private router: Router
  ) { }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }
  ngOnInit() {
    this.initEmployeeList();
  }
  gotoDetail(data) {
    // const modalRef = this.modalService.open(EmployeeDetailComponent);
    // modalRef.componentInstance.employeeData = data;
    // window.open(AppConstant.SYSTEM_SERVER_LINK + "map-history", "_blank");
    this.router.navigate(['/map-history']);
  }
  getDate(date: any) {
    if (!!date) {
      return new Date(date["year"], date["month"] - 1, date["day"]);
    }
  }
  getPhone(phone) {
    return !!phone && !!phone.number ? phone.number : ""
  }
  initEmployeeList = () => {
    if (!!localStorage.getItem("UserList")) {
      this.employeeList = <Array<EmployeesModel>>JSON.parse(
        localStorage.getItem("UserList")
      ).filter((e) => {
        return e.userType === "Employee";
      });
    }
  };
  setIsActiveRecord(value, record) {
    let message = AppConstant.MESSAGES.ACTIVE_CONFIRM_MESSAGE;
    if (!value) {
      message = AppConstant.MESSAGES.IN_ACTIVE_CONFIRM_MESSAGE;
    }
    this.coreHelperService
      .showConfirmDialog(
        AppConstant.MESSAGES.CONFIRM_TITLE,
        message,
        "question",
        true
      )
      .then((result) => {
        if (result.value) {
          const items = [];
          items.push(record);
          value = !value;
          this.updateRecordForAI(items, value);
        }
      });
  }

  deleteRecord(data) {
    this.coreHelperService
      .showConfirmDialog(
        AppConstant.MESSAGES.CONFIRM_TITLE,
        AppConstant.MESSAGES.DELETE_MESSAGE,
        "warning",
        true
      )
      .then((result) => {
        if (result.value) {
          // API Call
          let items = [];
          items.push(data);
          this.updateRecordForD(items);
        }
      });
  }

  refreshRecord = () => {
    if (!!localStorage.getItem("UserList")) {
      this.employeeList = <Array<EmployeesModel>>JSON.parse(
        localStorage.getItem("UserList")
      ).filter((e) => {
        return e.userType === "Employee";
      });
      this.rerender();
    }
  };
  rerender(): void {
    this.coreHelperService.dataTableRefreshRenderer(
      this.dtElement,
      this.dtTrigger
    );
  }
  private updateRecordForAI(items, val) {
    let userList = <Array<UserModel>>(
      JSON.parse(localStorage.getItem("UserList"))
    );
    if (userList.length >= 1) {
      _.each(userList, (l) => {
        if (l.userType === "Employee" && items.some((f) => f.id === l.id)) {
          l.isActive = val;
        }
      });
      localStorage.setItem("UserList", JSON.stringify(userList));
      this.refreshRecord();
      this.toastr.success(
        AppConstant.MESSAGES.RECORD_UPDATE_SUCCESS,
        "Success"
      );
    }
  }
  private updateRecordForD(items) {
    let userList = <Array<UserModel>>(
      JSON.parse(localStorage.getItem("UserList"))
    );
    if (userList.length >= 1) {
      let filterRecord = [];
      _.each(userList, (l) => {
        if (!items.some((f) => f.id === l.id)) {
          filterRecord.push(l);
        }
      });
      localStorage.setItem("UserList", JSON.stringify(filterRecord));
      this.refreshRecord();
      Swal.fire(
        "Deleted!",
        AppConstant.MESSAGES.DELETE_SUCCESS,
        "success"
      );
    }
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
