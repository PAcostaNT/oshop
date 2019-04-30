import { CoreModule } from './core/core.module';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { DataTableModule } from 'angular7-data-table';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from 'environments/environment';
import { CustomFormsModule } from 'ng2-validation';
import { AppComponent } from './app.component';
import { LoginComponent } from './core/components/login/login.component';
import { ProductsComponent } from './shopping/components/products/products.component';
import { SharedModule } from 'shared/shared.module';
import { AdminModule } from './admin/admin.module';
import { ShoppingModule } from './shopping/shopping.module';

// Firebase Modules
// dev environment
// components
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CoreModule,
    ShoppingModule,
    SharedModule,
    AdminModule,
    DataTableModule.forRoot(),  
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forRoot([
      // anonymous routes
      { path: "", component: ProductsComponent },
      { path: "login", component: LoginComponent },
    ]),
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
