import { Injectable } from "@angular/core";
import { CoreHttpService } from "../core/core-http.service";
import { UserLoginModel, ChangePasswordModel, UserModel } from "./authentication.class";
import { AppConstant } from '../app.constant';

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  URL: string = AppConstant.API_LINK + 'Users';
  constructor(private coreHttpService: CoreHttpService) { }

  validateUser(userLoginModel: UserLoginModel) {
    const url = this.URL + "token";
    return this.coreHttpService.httpGetRequest<Array<UserModel>>(url);
  }

  validateEmail(email: string) {
    const url = this.URL + "?emailAddress=" + email;
    return this.coreHttpService.httpGetRequest<Array<UserModel>>(url);
  }

  registerUser(userModel: UserModel) {
    const url = this.URL + "user";
    return this.coreHttpService.httpPostRequest(url, userModel);
  }

  ResetPassword(changePassword: ChangePasswordModel) {
    const url = this.URL + "user";
    return this.coreHttpService.httpPostRequest(url, changePassword);
  }
}
