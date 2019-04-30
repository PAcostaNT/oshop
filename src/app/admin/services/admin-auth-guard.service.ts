import { UserService } from "shared/services/user.service";
import { AuthService } from "shared/services/auth.service";
import { Injectable } from "@angular/core";
import {  map } from "rxjs/operators";
import { CanActivate } from '@angular/router/src/utils/preactivation';


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
