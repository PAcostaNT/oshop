import { AuthService } from "./../auth.service";
import { Component, OnInit } from "@angular/core";
import { OrderService } from "../order.service";
import { switchMap } from 'rxjs/operators';

@Component({
  selector: "app-my-orders",
  templateUrl: "./my-orders.component.html",
  styleUrls: ["./my-orders.component.sass"]
})
export class MyOrdersComponent implements OnInit {
  orders$;
  constructor(
    private authService: AuthService,
    private orderService: OrderService
  ) {
    this.authService.user$.subscribe(u => console.log(u.uid));
    this.orders$ = authService.user$.pipe(switchMap(u => orderService.getOrdersByUser(u.uid).valueChanges()));
  }

  ngOnInit() {}
}
