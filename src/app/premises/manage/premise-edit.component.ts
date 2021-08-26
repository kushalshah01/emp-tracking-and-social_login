import {
    Component,
    OnInit,
    OnDestroy,
    AfterViewInit,
    ViewEncapsulation,
} from "@angular/core";
import * as _ from "lodash";
import { Router, ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { CoreHelperService } from "src/app/core/core-helper.service";
import { Core } from 'src/app/core/core.class';
import { PremisesModel } from '../premises.class';
import { AppConstant } from 'src/app/app.constant';

@Component({
    selector: "app-premises-edit",
    templateUrl: "./manage.component.html",
    styleUrls: ["./manage.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class PremisesManageEditComponent
    implements OnInit, AfterViewInit, OnDestroy {
    title: string = "Update Premise";
    countryList = Core.CountryList;
    minCap: number = 1;
    maxCap: number = 10000;
    premiseModel: PremisesModel = new PremisesModel();
    constructor(
        private router: Router,
        private toaster: ToastrService,
        private coreHelperService: CoreHelperService,
        private activatedRoute: ActivatedRoute,
    ) { }
    ngOnInit(): void {
        this.premiseModel.country = "";
        this.premiseModel.isActive = true;
        this.initPremiseData();
    }
    ngAfterViewInit(): void { }
    ngOnDestroy(): void { }
    onSubmit() {
        let premisesList = this.getPremisesList();
        if (premisesList.length >= 1) {
            _.each(premisesList, (list) => {
                if (list.id === this.premiseModel.id) {
                    list = Object.assign(list, this.premiseModel);
                }
            });
            localStorage.setItem("PremiseList", JSON.stringify(premisesList));
            this.toaster.success(
                AppConstant.MESSAGES.RECORD_UPDATE_SUCCESS,
                "Success"
            );
            this.back();
        }
    }
    initPremiseData() {
        const premiseId = this.activatedRoute.snapshot.params["id"];
        if (!!localStorage.getItem("PremiseList")) {
            this.premiseModel = this.getPremisesList().find(
                (data) => data.id === premiseId
            );
            this.premiseModel.country = !this.premiseModel.country ? "" : this.premiseModel.country;
        }
    }
    private getPremisesList() {
        if (!!localStorage.getItem("PremiseList")) {
            return <Array<PremisesModel>>(
                JSON.parse(localStorage.getItem("PremiseList"))
            );
        } else {
            return [];
        }
    }
    back() {
        this.router.navigate(["/premises"]);
    }
}
