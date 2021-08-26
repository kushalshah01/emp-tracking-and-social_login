import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AuthChangePasswordRoutingModule } from "./auth-change-password-routing.module";
import { AuthChangePasswordComponent } from "./auth-change-password.component";
import { FormsModule } from "@angular/forms";
import { CoreModule } from "src/app/core/core.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AuthChangePasswordRoutingModule,
    CoreModule,
  ],
  declarations: [AuthChangePasswordComponent],
})
export class AuthChangePasswordModule {}
