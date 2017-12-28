import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { LocalStorageService,
    UserArrayService, AuthService, CartService, ProductsService, DialogService,
    OrderArrayService, UsersAPI, usersBaseUrl, OrdersAPI, ordersBaseUrl, TimingInterceptor,
    ServerAddressInterceptor, NewsService } from './';

@NgModule({
  providers: [
    AuthService,
    DialogService,
    LocalStorageService,
    CartService,
    ProductsService,
    UserArrayService,
    OrderArrayService,
    NewsService,
    {provide: UsersAPI, useValue: usersBaseUrl},
    {provide: OrdersAPI, useValue: ordersBaseUrl},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerAddressInterceptor,
      multi: true,
    }
  ]
})
export class ServicesModule {}
