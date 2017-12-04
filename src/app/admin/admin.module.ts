import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { AdminRoutingModule } from './admin.routing.module';
import { AdminComponent, OrdersComponent, ProductListComponent, ProductComponent } from '.';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule
  ],
  exports: [
    AdminComponent
  ],
  declarations: [
    AdminComponent,
    OrdersComponent,
    ProductListComponent,
    ProductComponent
  ]
})
export class AdminModule { }
