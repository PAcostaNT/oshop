import { ProductService } from "./../../product.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { Product } from "src/app/models/product";
import { DataTableResource } from "angular7-data-table";

@Component({
  selector: "app-admin-products",
  templateUrl: "./admin-products.component.html",
  styleUrls: ["./admin-products.component.sass"]
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];

  subscription: Subscription;
  table: DataTableResource<Product>;
  items: Product[] = [];
  itemCount: number;

  constructor(private prodService: ProductService) {
    this.subscription = this.prodService.getAll().subscribe(snapshots => {
      snapshots.forEach((snapshot, i) => {
        this.products[i] = snapshot.payload.val() as Product;
        this.products[i].key = snapshot.payload.key;
        console.log(snapshot.payload)
        // console.log( snapshot.payload.val());
      });
      this.initializeTable(this.products);
    });
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private initializeTable(products: Product[]) {
    this.table = new DataTableResource(products);
    this.table.query({ offset: 0 }).then(items => {console.log(items);(this.items = items)});
    this.table.count().then(count => (this.itemCount = count));
  }

  reloadItems(params) {
    if (!this.table) return;
    this.table.query(params).then(items => (this.items = items));
  }
  filter(query: string) {
    const filteredProducts = query
      ? this.products.filter(p =>
          p.title.toLowerCase().includes(query.toLowerCase())
        )
      : this.products;

    this.initializeTable(filteredProducts);
  }
}
