import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AdminComponent } from "./theme/layout/admin/admin.component";
import { AuthComponent } from "./theme/layout/auth/auth.component";
import { AuthGuardService } from "./authentication/guards/auth-guard.service";
import { PremiseMapComponent } from './premise-map/premise-map.component';

const routes: Routes = [
  {
    path: "",
    component: AuthComponent,
    children: [
      {
        path: "",
        redirectTo: "emp-landing",
        pathMatch: "full",
      },
      {
        path: "emp-landing",
        loadChildren: () =>
          import("./employee-info/employee-info.module").then(
            (module) => module.EmployeeInfoageModule
          ),
      },
    ],
  },
  {
    path: "",
    component: AuthComponent,
    children: [
      {
        path: "auth",
        redirectTo: "auth/signin",
        pathMatch: "full",
      },
      {
        path: "auth",
        loadChildren: () =>
          import("./authentication/authentication.module").then(
            (module) => module.AuthenticationModule
          ),
      },
    ],
  },
  {
    path: "",
    component: AdminComponent,
    children: [
      {
        path: "employees",
        loadChildren: () =>
          import("./employees/employees.module").then(
            (module) => module.EmployeesPageModule
          ),
      },
      {
        path: "premises",
        loadChildren: () =>
          import("./premises/premises.module").then(
            (module) => module.PremisesPageModule
          ),
      },
    ],
    canActivate: [AuthGuardService],
  },
  {
    path: "map",
    component: PremiseMapComponent,
  },
  // {
  //   path: "map-history",
  //   component: EmployeeDetailMapComponent,
  // }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }