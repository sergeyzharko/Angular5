import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { AdminRoutingModule, adminRouterComponents } from './admin.routing.module';
import { AdminComponent } from '.';

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
    adminRouterComponents
  ]
})
export class AdminModule { }
