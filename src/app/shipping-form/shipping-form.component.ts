import { ShoppingCart } from './../models/shopping-cart';
import { OnDestroy, Input } from '@angular/core';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { Order } from '../models/order';
import { Router } from '@angular/router';
import { OrderService } from '../order.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.sass']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input('cart') cart: ShoppingCart;
  shipping = {};
  userSubscription: Subscription;
  userId: string;
  constructor(
    private router: Router,
    private orderService: OrderService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(
      user => (this.userId = user.uid)
    );
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  async placeOrder() {
    let o = new Order(this.userId, this.shipping, this.cart);
    let result = await this.orderService.placeOrder(o);
    this.router.navigate(['/order-success', result.key]);
  }

}
