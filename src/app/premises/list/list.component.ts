import {
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
  AfterViewInit,
} from "@angular/core";
import * as _ from "lodash";
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { CoreHelperService } from 'src/app/core/core-helper.service';
import { PremisesModel } from '../premises.class';
import Swal from 'sweetalert2';
import { AppConstant } from 'src/app/app.constant';

@Component({
  selector: "app-premises-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class PremisesListComponent implements OnInit, AfterViewInit, OnDestroy {
  premisesList: PremisesModel[] = [];
  dtOptions: DataTables.Settings | any = {
    ordering: true,
    order: [],
    responsive: true,

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
  ) { }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }
  ngOnInit() {
    this.initPremises();
  }

  initPremises = () => {
    if (!!localStorage.getItem("PremiseList")) {
      this.premisesList = <Array<PremisesModel>>JSON.parse(
        localStorage.getItem("PremiseList")
      );
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
    if (!!localStorage.getItem("PremiseList")) {
      this.premisesList = <Array<PremisesModel>>JSON.parse(
        localStorage.getItem("PremiseList")
      )
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
    let premiseList = <Array<PremisesModel>>(
      JSON.parse(localStorage.getItem("PremiseList"))
    );
    if (premiseList.length >= 1) {
      _.each(premiseList, (l) => {
        if (items.some((f) => f.id === l.id)) {
          l.isActive = val;
        }
      });
      localStorage.setItem("PremiseList", JSON.stringify(premiseList));
      this.refreshRecord();
      this.toastr.success(
        AppConstant.MESSAGES.RECORD_UPDATE_SUCCESS,
        "Success"
      );
    }
  }
  private updateRecordForD(items) {
    let premiseList = <Array<PremisesModel>>(
      JSON.parse(localStorage.getItem("PremiseList"))
    );
    if (premiseList.length >= 1) {
      let filterRecord = [];
      _.each(premiseList, (l) => {
        if (!items.some((f) => f.id === l.id)) {
          filterRecord.push(l);
        }
      });
      localStorage.setItem("PremiseList", JSON.stringify(filterRecord));
      this.refreshRecord();
      Swal.fire(
        "Deleted!",
        AppConstant.MESSAGES.DELETE_SUCCESS,
        "success"
      );
    }
  }

  viewMap() {
    window.open(AppConstant.SYSTEM_SERVER_LINK + "/map", "_blank");
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
