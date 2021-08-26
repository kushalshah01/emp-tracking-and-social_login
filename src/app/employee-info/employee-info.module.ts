import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../theme/shared/shared.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { EmployeesInfoRoutingModule } from './employee-info-routing.module';
import { LandingPage } from './landing/landing.component';
import { Header } from './header/header.component';
import { AboutUs } from './about-us/about-us.component';
import { Events } from './events/events.component';
import { EmployeeMapComponent } from './employee-map/employee-map.component';

@NgModule({
  declarations: [
    LandingPage,
    Header,
    AboutUs,
    Events,
    EmployeeMapComponent
  ],
  entryComponents: [],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    EmployeesInfoRoutingModule
  ],
  providers: [],
})
export class EmployeeInfoageModule { }
