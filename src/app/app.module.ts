import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';

import { AppRoutingModule, appRouterComponents } from './app.routing.module';

import { AppComponent } from './app.component';
import { HelloComponent } from './components/hello/hello.component';
import { GeneratorService, LocalStorageService, ConfigOptionsService, ConstantsService,
  Random5, RandomN, UserArrayService, AuthService, CartService, ProductsService, DialogService,
  OrderArrayService, UsersAPI, usersBaseUrl, OrdersAPI, ordersBaseUrl, TimingInterceptor,
  ServerAddressInterceptor, NewsService } from './services/';
import { NewsOrderPipe } from './pipes/order-by.pipe';
import { ConfigOptionsComponent } from './components/config-options/config-options.component';
import { ConstantsComponent } from './components/constants/constants.component';
import { GeneratorComponent } from './components/generator/generator.component';
import { LocalStorageComponent } from './components/local-storage/local-storage.component';
import { HighlightDirective } from './directives/highlight.directive';
import { AuthGuard } from './guards/auth.guard';
import { CartModule } from './cart/cart.module';
import { MyOrdersModule } from './my-orders/my-orders.module';
import { UserFormModule } from './user-form/user-form.module';


const TaskManager = new ConstantsService();

@NgModule({
  declarations: [
    AppComponent,
    HelloComponent,
    ConfigOptionsComponent,
    ConstantsComponent,
    GeneratorComponent,
    LocalStorageComponent,
    HighlightDirective,
    appRouterComponents
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CartModule,
    HttpClientModule,
    MyOrdersModule,
    UserFormModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCt87xDw1zzoBOTzmSn6r8OdE220cn_MKc'
    })
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
    ConfigOptionsService,
    { provide: ConstantsService, useValue: TaskManager },
    GeneratorService,
    { provide: Random5, useFactory:  RandomN(5), deps: [ GeneratorService ] },
    UserArrayService,
    OrderArrayService,
    NewsService,
    NewsOrderPipe,
    {provide: UsersAPI, useValue: usersBaseUrl},
    {provide: OrdersAPI, useValue: ordersBaseUrl},
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TimingInterceptor,
    //   multi: true,
    // },
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
