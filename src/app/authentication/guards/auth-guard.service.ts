import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) {
  }
  canActivate(
    route: import("@angular/router").ActivatedRouteSnapshot,
    state: import("@angular/router").RouterStateSnapshot): boolean |
    import("@angular/router").UrlTree | import("rxjs").Observable<boolean |
    import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {

    if (!!localStorage.getItem("IsLoggedIn")) {
      const data = localStorage.getItem("IsLoggedIn");
      if (data == "true") {
        return true;

      } else {
        this.router.navigate(['/']);
        return false;
      }
    } else {
      this.router.navigate(['/']);
      return false;
    }

  }
}
