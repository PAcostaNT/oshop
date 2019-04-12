import { AppUser } from './../models/app-user';
import { AuthService } from "./../auth.service";
import { Component, OnInit } from "@angular/core";

@Component({
  // tslint:disable-next-line: component-selector
  selector: "bs-navbar",
  templateUrl: "./bs-navbar.component.html",
  styleUrls: ["./bs-navbar.component.scss"]
})
export class BsNavbarComponent {
  appUser: AppUser;
  constructor(private auth: AuthService) {
    auth.appUser$.subscribe(appuser => this.appUser = appuser);
  }

  logout() {
    this.auth.logout();
  }
}
