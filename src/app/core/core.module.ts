import { NgModule } from "@angular/core";
import { CoreHttpService } from "./core-http.service";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { LoaderService } from "./core-loader.service";
import { CoreHelperService } from "./core-helper.service";
import { CoreFormValidationService } from "./core-form-validation.service";
import { ErrorDialogComponent } from "./dialog/error-list.component";
import { MatchPasswordDirective } from "./core-directicve/pass-match.directive";
import { CustomvalidationService } from './core-directicve/custom-velidator.service';
import { CustomMinDirective } from './core-directicve/custom-min-validator.directive';
import { CustomMaxDirective } from './core-directicve/custom-max-validator.directive';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  declarations: [
    ErrorDialogComponent,

    MatchPasswordDirective,
    CustomMinDirective,
    CustomMaxDirective
  ],
  providers: [
    CoreHttpService,
    LoaderService,
    CoreHelperService,
    CoreFormValidationService,
    CustomvalidationService
  ],
  exports: [MatchPasswordDirective, CustomMaxDirective, CustomMinDirective],
  entryComponents: [ErrorDialogComponent],
})
export class CoreModule { }
