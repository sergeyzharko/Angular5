import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';

// Modules

import { ProductComponent } from './components/product/product.component';
import { ProductListComponent, ProductsService } from './components/product-list';
import { CartService, CartComponent } from './components/cart';
import { Product, Category } from './components/product/';
import { Item, CartItemComponent} from './components/cart-item/';
import { Hello } from './components/hello/hello.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ProductListComponent,
    CartComponent,
    CartItemComponent,
    Hello
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  exports: [
    AppComponent,
    ProductComponent,
    ProductListComponent,
    CartComponent
  ],
  providers: [
    ProductsService,
    CartService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
