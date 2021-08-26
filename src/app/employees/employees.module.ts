import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../theme/shared/shared.module";
import { DataTablesModule } from "angular-datatables";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbDatepickerModule, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { TagInputModule } from "ngx-chips";
import { EmployeesRoutingModule } from "./employees-routing.module";
import { TinymceModule } from "angular2-tinymce";
import { AngularEditorModule } from "@kolkov/angular-editor";
import { EmployeeListComponent } from "./list/list.component";
import { EmployeesManageAddComponent } from "./employee-manage/employee-add.component";
import { EmployeesManageEditComponent } from "./employee-manage/employee-edit.component";
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { EmployeeDetailComponent } from './detail/detail.component';
import { EmployeesService } from './employees.service';
import { EmployeeDetailMapComponent } from './employee-map/employee-map.component';

@NgModule({
  declarations: [
    EmployeeListComponent,
    EmployeesManageAddComponent,
    EmployeesManageEditComponent,
    EmployeeDetailComponent,
    EmployeeDetailMapComponent
  ],
  entryComponents: [EmployeeDetailComponent],
  imports: [
    CommonModule,
    SharedModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
    TagInputModule,
    TinymceModule,
    AngularEditorModule,
    NgbModule,
    EmployeesRoutingModule,
    NgxIntlTelInputModule
  ],
  providers: [EmployeesService],
})
export class EmployeesPageModule { }
