import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductListComponent, ProductComponent, ProductsService } from '.';
import { ProductsRoutingModule } from './products.routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ProductsRoutingModule
  ],
  providers: [
    ProductsService
  ],
  declarations: [
    ProductListComponent, ProductComponent
  ]
})
export class ProductsModule { }
