import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CartComponent } from './';
import { OrderComponent } from './';

const routes: Routes = [
  {
    path: 'cart',
    component: CartComponent,
    outlet: 'popup'
  },
  {
    path: 'order',
    component: OrderComponent,
    data: { title: 'Cart' }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class CartRoutingModule { }
