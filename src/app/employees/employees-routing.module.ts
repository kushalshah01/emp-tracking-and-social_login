import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { EmployeeListComponent } from "./list/list.component";
import { EmployeesManageAddComponent } from "./employee-manage/employee-add.component";
import { EmployeesManageEditComponent } from './employee-manage/employee-edit.component';
import { EmployeeDetailMapComponent } from './employee-map/employee-map.component';

const routes: Routes = [
  {
    path: "",
    component: EmployeeListComponent,
  },
  {
    path: "create",
    component: EmployeesManageAddComponent,
  },
  {
    path: "map-history",
    component: EmployeeDetailMapComponent,
  },
  {
    path: ":id",
    component: EmployeesManageEditComponent,
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeesRoutingModule {}
