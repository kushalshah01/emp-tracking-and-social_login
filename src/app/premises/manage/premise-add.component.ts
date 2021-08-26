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
import { Core } from 'src/app/core/core.class';
import { PremisesModel } from '../premises.class';
import { AppConstant } from 'src/app/app.constant';

@Component({
    selector: "app-premises-add",
    templateUrl: "./manage.component.html",
    styleUrls: ["./manage.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class PremisesManageAddComponent
    implements OnInit, AfterViewInit, OnDestroy {
    title: string = "New Premise";
    countryList = Core.CountryList;
    minCap: number = 1;
    maxCap: number = 10000;
    premiseModel: PremisesModel = new PremisesModel();
    constructor(
        private router: Router,
        private toaster: ToastrService,
        private coreHelperService: CoreHelperService,
    ) { }
    ngOnInit(): void {
        this.premiseModel.country = "";
        this.premiseModel.isActive = true;
    }
    ngAfterViewInit(): void { }
    ngOnDestroy(): void { }
    onSubmit() {
        if (!!localStorage.getItem("PremiseList")) {
            const premiseList = <Array<PremisesModel>>(
                JSON.parse(localStorage.getItem("PremiseList"))
            );
            if (premiseList.length >= 1) {
                this.create(premiseList);
            }
        } else {
            this.create([]);
        }
    }
    private create(premiseList: Array<PremisesModel>) {
        this.premiseModel.id = this.coreHelperService.generateGUID();
        premiseList.push(this.premiseModel);
        localStorage.setItem("PremiseList", JSON.stringify(premiseList));
        this.toaster.success(
            AppConstant.MESSAGES.PREMISE_CREATE_SUCCESS,
            "Success"
        );
        this.back();
    }
    // private saveFile() {
    //     if (!!this.premiseModel.floorPlan && this.premiseModel.floorPlan.length >= 1) {
    //         if (!!localStorage.getItem("PremiseFloorPlan")) {
    //             const floorList = <Array<PremisesModel>>(
    //                 JSON.parse(localStorage.getItem("PremiseFloorPlan"))
    //             );
    //             if (floorList.length >= 1) {
    //                 this.createFloor(floorList);
    //             }
    //         } else {
    //             this.createFloor([])
    //         }
    //     }
    // }
    // private createFloor(list) {

    // }
    back() {
        this.router.navigate(["/premises"]);
    }
}
