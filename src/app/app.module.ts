import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppRoutingModule } from './app.routing.module';

import { AppComponent } from './app.component';
import { LocalStorageService,
  UserArrayService, AuthService, CartService, ProductsService, DialogService,
  OrderArrayService, UsersAPI, usersBaseUrl, OrdersAPI, ordersBaseUrl, TimingInterceptor,
  ServerAddressInterceptor, NewsService } from './services/';
import { NewsOrderPipe } from './pipes/order-by.pipe';
import { HighlightDirective } from './directives/highlight.directive';
import { AuthGuard } from './guards/auth.guard';
import { CartModule } from './cart/cart.module';
import { MyOrdersModule } from './my-orders/my-orders.module';
import { UserFormModule } from './user-form/user-form.module';
import { PagesModule } from './pages/pages.module';

@NgModule({
  declarations: [
    AppComponent,
    HighlightDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CartModule,
    HttpClientModule,
    MyOrdersModule,
    UserFormModule,
    PagesModule,
    AppRoutingModule
  ],
  exports: [
    AppComponent
  ],
  providers: [
    AuthGuard,
    AuthService,
    DialogService,
    LocalStorageService,
    CartService,
    ProductsService,
    UserArrayService,
    OrderArrayService,
    NewsService,
    NewsOrderPipe,
    {provide: UsersAPI, useValue: usersBaseUrl},
    {provide: OrdersAPI, useValue: ordersBaseUrl},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerAddressInterceptor,
      multi: true,
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(router: Router) {
    // Отображение структуры роутинга:
    // console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
  }
}
