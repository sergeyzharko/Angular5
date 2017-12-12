import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CartComponent, CartItemComponent, OrderComponent } from '.';
import { CartRoutingModule } from './cart.routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CartRoutingModule
  ],
  exports: [
    CartComponent
  ],
  declarations: [
    CartComponent,
    OrderComponent,
    CartItemComponent
  ]
})
export class CartModule { }
