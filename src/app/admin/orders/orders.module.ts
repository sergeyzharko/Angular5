import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule, ordersRouterComponents } from './orders.routing.module';
import { OrderComponent } from '.';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    OrdersRoutingModule
  ],
  declarations: [
    ordersRouterComponents,
    OrderComponent
  ]
})
export class OrdersModule {}
