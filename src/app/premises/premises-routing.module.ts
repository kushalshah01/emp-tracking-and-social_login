import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PremisesListComponent } from './list/list.component';
import { PremisesManageAddComponent } from './manage/premise-add.component';
import { PremisesManageEditComponent } from './manage/premise-edit.component';

const routes: Routes = [
  {
    path: "",
    component: PremisesListComponent,
  },
  {
    path: "create",
    component: PremisesManageAddComponent,
  },
  {
    path: ":id",
    component: PremisesManageEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PremisesRoutingModule { }
