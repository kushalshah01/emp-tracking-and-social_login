import { Component } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "select-user-type-model",
  templateUrl: "./user-type.component.html",
})
export class SelectUserTypeComponent {
  userType: string = "";

  constructor(
    public activeModal: NgbActiveModal,
    private toaster: ToastrService
  ) {}
  select() {
    if (!!this.userType && this.userType !== "") {
      this.activeModal.close(this.userType);
    } else {
      this.toaster.error("Please select user type.");
    }
  }
}
