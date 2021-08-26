import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LandingPage } from './landing/landing.component';
import { AboutUs } from './about-us/about-us.component';
import { Events } from './events/events.component';
import { EmployeeMapComponent } from './employee-map/employee-map.component';


const routes: Routes = [
  {
    path: "",
    component: LandingPage,
  },
  {
    path: "about-us",
    component: AboutUs
  },
  {
    path: "events",
    component: Events
  },
  {
    path: "checkin",
    component: EmployeeMapComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeesInfoRoutingModule { }
