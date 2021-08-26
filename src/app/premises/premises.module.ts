import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../theme/shared/shared.module";
import { DataTablesModule } from "angular-datatables";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbDatepickerModule, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { PremisesRoutingModule } from './premises-routing.module';
import { PremisesListComponent } from './list/list.component';
import { PremisesManageAddComponent } from './manage/premise-add.component';
import { CoreModule } from '../core/core.module';
import { PremisesManageEditComponent } from './manage/premise-edit.component';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { PremisesService } from './premise.service';


@NgModule({
    declarations: [
        PremisesListComponent,
        PremisesManageAddComponent,
        PremisesManageEditComponent
    ],
    entryComponents: [],
    imports: [
        CommonModule,
        SharedModule,
        DataTablesModule,
        FormsModule,
        ReactiveFormsModule,
        NgbDatepickerModule,
        NgbModule,
        PremisesRoutingModule,
        CoreModule,
        FileUploadModule
    ],
    providers: [PremisesService],
})
export class PremisesPageModule { }
