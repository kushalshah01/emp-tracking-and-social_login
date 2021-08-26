import { Component, Input, AfterViewInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { EmployeesModel } from '../employees.class';

@Component({
    selector: "emp-detail",
    templateUrl: "./detail.component.html",
    styles: [
        `
        .mt-20{
            margin-top:20px;
        }
        `
    ]
})
export class EmployeeDetailComponent implements AfterViewInit {

    @Input() employeeData: EmployeesModel;

    constructor(
        public activeModal: NgbActiveModal,
        private toaster: ToastrService
    ) {
       
     }
    ngAfterViewInit(): void {
        // if (!!this.employeeData.mobileNumber && this.employeeData.mobileNumber.number) {
        //     this.employeeData.mobileNumber = this.employeeData.mobileNumber.number;
        // } else {
        //     this.employeeData.mobileNumber = "";
        // }
    }

    getPhone(phone) {
        return !!phone && !!phone.number ? phone.number : ""
      }
}
