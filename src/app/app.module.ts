import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';

import { ProductComponent } from './components/product/product.component';
import { ProductListComponent, ProductsService } from './components/product-list';
import { CartService, CartComponent } from './components/cart';
import { OrderComponent } from './components/order';
import { Product, Category } from './components/product/';
import { Item, CartItemComponent} from './components/cart-item/';
import { HelloComponent } from './components/hello/hello.component';
import { GeneratorService, LocalStorageService, ConfigOptionsService, ConstantsService, Random5, RandomN } from './services/';
import { ConfigOptionsComponent } from './components/config-options/config-options.component';
import { ConstantsComponent } from './components/constants/constants.component';
import { GeneratorComponent } from './components/generator/generator.component';
import { LocalStorageComponent } from './components/local-storage/local-storage.component';
import { HighlightDirective } from './directives/highlight.directive';

const TaskManager = new ConstantsService();

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ProductListComponent,
    CartComponent,
    OrderComponent,
    CartItemComponent,
    HelloComponent,
    ConfigOptionsComponent,
    ConstantsComponent,
    GeneratorComponent,
    LocalStorageComponent,
    HighlightDirective
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
    CartService,
    LocalStorageService,
    ConfigOptionsService,
    { provide: ConstantsService, useValue: TaskManager },
    GeneratorService,
    { provide: Random5, useFactory:  RandomN(5), deps: [ GeneratorService ] }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
