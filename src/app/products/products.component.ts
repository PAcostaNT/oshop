import { ActivatedRoute } from "@angular/router";
import { CategoryService } from "./../category.service";
import { ProductService } from "./../product.service";
import { Component, OnInit } from "@angular/core";
import { Product } from "../models/product";
import { switchMap } from "rxjs/operators";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.sass"]
})
export class ProductsComponent implements OnInit {
  categories$;
  category: string;
  products: Product[] = [];
  filteredProducts: Product[] = [];
  constructor(private prodService: ProductService, route: ActivatedRoute) {
    this.prodService
      .getAll()
      .pipe(
        switchMap(products => {
          products.forEach((snapshot, i) => {
            this.products[i] = snapshot.payload.val() as Product;
            this.products[i].key = snapshot.payload.key;
          });
          return route.queryParamMap;
        })
      )
      .subscribe(params => {
        this.category = params.get("category");
        this.filteredProducts = this.category
          ? this.products.filter(p => p.category === this.category)
          : this.products;
      });
  }

  ngOnInit() {}
}
