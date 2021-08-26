import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule, APP_INITIALIZER } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { SharedModule } from "./theme/shared/shared.module";

import { AppComponent } from "./app.component";
import { AdminComponent } from "./theme/layout/admin/admin.component";
import { AuthComponent } from "./theme/layout/auth/auth.component";
import { NavigationComponent } from "./theme/layout/admin/navigation/navigation.component";
import { NavContentComponent } from "./theme/layout/admin/navigation/nav-content/nav-content.component";
import { NavGroupComponent } from "./theme/layout/admin/navigation/nav-content/nav-group/nav-group.component";
import { NavCollapseComponent } from "./theme/layout/admin/navigation/nav-content/nav-collapse/nav-collapse.component";
import { NavItemComponent } from "./theme/layout/admin/navigation/nav-content/nav-item/nav-item.component";
import { NavBarComponent } from "./theme/layout/admin/nav-bar/nav-bar.component";
import { NavLeftComponent } from "./theme/layout/admin/nav-bar/nav-left/nav-left.component";
import { NavSearchComponent } from "./theme/layout/admin/nav-bar/nav-left/nav-search/nav-search.component";
import { NavRightComponent } from "./theme/layout/admin/nav-bar/nav-right/nav-right.component";
import { ConfigurationComponent } from "./theme/layout/admin/configuration/configuration.component";

import { ToggleFullScreenDirective } from "./theme/shared/full-screen/toggle-full-screen";

/* Menu Items */
import { NavigationItem } from "./theme/layout/admin/navigation/navigation";
import {
  NgbButtonsModule,
  NgbDropdownModule,
  NgbTabsetModule,
  NgbTooltipModule,
  NgbModule,
} from "@ng-bootstrap/ng-bootstrap";
import { CoreModule } from "./core/core.module";
import { ToastrModule } from "ngx-toastr";
import { ModalModule } from "ngx-bootstrap/modal";
import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { provideConfig } from "./core/google-provide-config";
import { NgxIntlTelInputModule } from "ngx-intl-tel-input";
import { PremiseMapComponent } from './premise-map/premise-map.component';
// import { EmployeeDetailMapComponent } from './employee-map/employee-map.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AuthComponent,
    NavigationComponent,
    NavContentComponent,
    NavGroupComponent,
    NavCollapseComponent,
    NavItemComponent,
    NavBarComponent,
    NavLeftComponent,
    NavSearchComponent,
    NavRightComponent,
    ConfigurationComponent,
    ToggleFullScreenDirective,
    PremiseMapComponent,
    // EmployeeDetailMapComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    NgbDropdownModule,
    NgbTooltipModule,
    NgbButtonsModule,
    NgbTabsetModule,
    CoreModule,
    ToastrModule.forRoot(),
    ModalModule.forRoot(),
    SocialLoginModule,
    NgbModule,
    NgxIntlTelInputModule,
  ],
  providers: [
    NavigationItem,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig,
    },
  ],

  bootstrap: [AppComponent],
})
export class AppModule { }
