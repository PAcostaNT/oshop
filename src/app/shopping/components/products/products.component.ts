import { Subscription, Observable } from "rxjs";
import { ShoppingCartService } from "shared/services/shopping-cart.service";
import { ActivatedRoute } from "@angular/router";
import { CategoryService } from "shared/services/category.service";
import { ProductService } from "shared/services/product.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Product } from "shared/models/product";
import { switchMap } from "rxjs/operators";
import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.sass"]
})
export class ProductsComponent implements OnInit {
  categories$;
  cart$: Observable<ShoppingCart>;
  category: string;
  products: Product[] = [];
  filteredProducts: Product[] = [];
  constructor(
    private prodService: ProductService,
    private route: ActivatedRoute,
    private cartService: ShoppingCartService
  ) {
    
  }

  async ngOnInit() {
    this.cart$ = await this.cartService.getCart();
    this.populateProducts();
  }

  private populateProducts() {
    this.prodService
    .getAll()
    .pipe(
      switchMap(products => {
        products.forEach((snapshot, i) => {
          this.products[i] = snapshot.payload.val() as Product;
          this.products[i].key = snapshot.payload.key;
        });
        return this.route.queryParamMap;
      })
    )
    .subscribe(params => {
      this.category = params.get("category");
      this.applyFilter();
    });
  }

  private applyFilter() {
    this.filteredProducts = this.category
          ? this.products.filter(p => p.category === this.category)
          : this.products;
  }
}
