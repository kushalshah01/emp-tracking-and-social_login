import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AuthSigninRoutingModule } from "./auth-signin-routing.module";
import { AuthSigninComponent } from "./auth-signin.component";
import { FormsModule } from "@angular/forms";
import { SelectUserTypeComponent } from "./select-user-type/user-type.component";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  imports: [CommonModule, AuthSigninRoutingModule, FormsModule,NgbModule],
  declarations: [AuthSigninComponent, SelectUserTypeComponent],
  entryComponents: [SelectUserTypeComponent],
})
export class AuthSigninModule {}
