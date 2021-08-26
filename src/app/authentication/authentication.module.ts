import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AuthenticationRoutingModule } from "./authentication-routing.module";
import { FormsModule } from "@angular/forms";
import { AuthGuardService } from './guards/auth-guard.service';

@NgModule({
  imports: [CommonModule, FormsModule, AuthenticationRoutingModule],
  declarations: [],
  providers: [AuthGuardService],
})
export class AuthenticationModule {}
