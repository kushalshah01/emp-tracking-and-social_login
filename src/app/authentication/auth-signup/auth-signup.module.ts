import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AuthSignupRoutingModule } from "./auth-signup-routing.module";
import { AuthSignupComponent } from "./auth-signup.component";
import { FormsModule } from "@angular/forms";
import { CoreModule } from "src/app/core/core.module";

@NgModule({
  imports: [CommonModule, AuthSignupRoutingModule, FormsModule, CoreModule],
  declarations: [AuthSignupComponent],
})
export class AuthSignupModule {}
