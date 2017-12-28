import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {APP_BASE_HREF} from '@angular/common';


import { AppRoutingModule } from './app.routing.module';

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
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
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
        },
        {provide: APP_BASE_HREF, useValue : '/' }
      ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'Shop'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Shop');
  }));
  it('should render footer with Kristina Shop', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.footer').textContent).toContain('Kristina Shop');
  }));
});
