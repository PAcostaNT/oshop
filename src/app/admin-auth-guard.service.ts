import { UserService } from "./user.service";
import { AuthService } from "./auth.service";
import { CanActivate } from "@angular/router/src/utils/preactivation";
import { Injectable } from "@angular/core";
import { switchMap, map } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AdminAuthGuardService implements CanActivate {
  path;
  route;
  constructor(private auth: AuthService, private userService: UserService) {}

  canActivate()  {
    return this.auth.appUser$
      .pipe(
      map(appUser => appUser.isAdmin));
  }
}
