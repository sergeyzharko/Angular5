import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdersComponent, OrderListComponent } from '.';
import { CanDeactivateGuard } from './../../guards';

const routes: Routes = [
  {
    path: 'orders',
    component: OrdersComponent,
    children: [
      {
        path: '',
        component: OrderListComponent
      }
    ]
  }
];

export let ordersRouterComponents = [OrdersComponent, OrderListComponent];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  providers: [
    CanDeactivateGuard
  ]
})
export class OrdersRoutingModule { }
