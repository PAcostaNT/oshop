import { ShoppingCartService } from "./../shopping-cart.service";
import { AppUser } from "./../models/app-user";
import { AuthService } from "./../auth.service";
import { Component, OnInit } from "@angular/core";
import { ShoppingCart } from "../models/shopping-cart";
import { AngularFireObject } from "angularfire2/database";
import { Observable } from "rxjs";

@Component({
  // tslint:disable-next-line: component-selector
  selector: "bs-navbar",
  templateUrl: "./bs-navbar.component.html",
  styleUrls: ["./bs-navbar.component.scss"]
})
export class BsNavbarComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private cartService: ShoppingCartService
  ) {}
  cart$: Observable<ShoppingCart>;
  appUser: AppUser;
  async ngOnInit() {
    this.auth.appUser$.subscribe(appuser => (this.appUser = appuser));
    this.cart$ = await this.cartService.getCart();
  }
  ut() {
    this.auth.logout();
  }
}
