import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MyOrdersRoutingModule, myOrdersRouterComponents } from './my-orders.routing.module';
import { OrderComponent } from '.';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MyOrdersRoutingModule
  ],
  declarations: [
    myOrdersRouterComponents,
    OrderComponent
  ]
})
export class MyOrdersModule {}
