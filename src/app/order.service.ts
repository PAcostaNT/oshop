import { ShoppingCartService } from './shopping-cart.service';
import { AngularFireList, QueryFn } from 'angularfire2/database';
import { AngularFireDatabase } from 'angularfire2/database';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase, private cartService: ShoppingCartService) { }

  async placeOrder(order) {
    let result = await this.db.list('/orders').push(order);
    this.cartService.clearCart();
    return result;
  }

  getOrders() {
    return this.db.list('/orders');
  }

  getOrdersByUser(userId: string) {
    return this.db.list('/orders',
      ref => ref.orderByChild('userId').equalTo(userId)
    );
  }
}
