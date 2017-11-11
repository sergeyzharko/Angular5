import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';

// Modules

import { productComponent } from './components/product/product.component';
import { OneProductComponent, ProductListComponent, ProductsService } from './components/product-list';

@NgModule({
  declarations: [
    AppComponent,
    productComponent,
    OneProductComponent,
    ProductListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [ProductsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
