import { UserService } from './user.service';
import { AuthService } from "./auth.service";
import { Component } from "@angular/core";
import { routerNgProbeToken } from "@angular/router/src/router_module";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  constructor(private auth: AuthService, router: Router, private userService: UserService) {
    auth.user$.subscribe(user => {
      if (user) {
        userService.save(user);
// tslint:disable-next-line: prefer-const
        let returnUrl = localStorage.getItem("returnUrl");
        router.navigateByUrl(returnUrl);
      }
    });
  }
}
