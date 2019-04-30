import { AngularFireDatabase, AngularFireObject } from "angularfire2/database";
import { Injectable } from "@angular/core";
import { Product } from "shared/models/product";
import { take, map } from "rxjs/operators";
import { ShoppingCart } from "shared/models/shopping-cart";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ShoppingCartService {
  constructor(private db: AngularFireDatabase) {}

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db
      .object("/shopping-carts/" + cartId)
      .valueChanges()
      .pipe(map(x => new ShoppingCart(x["items"])));
  }

  async addToCart(product: Product) {
    this.updateItemQuantity(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItemQuantity(product, -1);
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.object("/shopping-carts/" + cartId + "/items").remove();
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object("/shopping-carts/" + cartId + "/items/" + productId);
  }

  private create() {
    return this.db.list("/shopping-carts").push({
      dateCreated: new Date().getTime()
    });
  }

  private async updateItemQuantity(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.key);
    item$
      .valueChanges()
      .pipe(take(1))
      .subscribe(item => {
        let quantity = 0;
        if (item) {
           quantity = item["quantity"] + change;
        }
        else {
           quantity += change;
        }
        console.log(quantity);
        if (quantity === 0) {
          console.log("wtf");
           item$.remove();
           } else { item$.update({ product, quantity }); }
      });
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem("cartId");
    if (cartId) {
      // if shoppingCart already exists return the id
      return cartId;
    }
    // create shoppingCart if it doesnt exist
    let result = await this.create();
    localStorage.setItem("cartId", result.key);
    return result.key;
  }
}
