import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductListComponent } from '.';

const routes: Routes = [
  {
    path: '',
    component: ProductListComponent,
    data: { title: 'Products' }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ProductsRoutingModule {}
