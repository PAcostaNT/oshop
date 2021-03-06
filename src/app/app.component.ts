import { UserService } from "shared/services/user.service";
import { AuthService } from "shared/services/auth.service";
import { Component } from "@angular/core";
import { routerNgProbeToken } from "@angular/router/src/router_module";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  constructor(
    private auth: AuthService,
    router: Router,
    private userService: UserService
  ) {
    auth.user$.subscribe(user => {
      if (!user) { return; }

      userService.save(user);
      // tslint:disable-next-line: prefer-const
      let returnUrl = localStorage.getItem("returnUrl");
      if (!returnUrl) { return; }
      localStorage.removeItem("returnUrl");
      router.navigateByUrl(returnUrl);
    });
  }
}
