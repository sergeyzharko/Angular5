import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyOrdersComponent, OrderListComponent } from '.';
import { CanDeactivateGuard } from './../guards';

const routes: Routes = [
  {
    path: '',
    component: OrderListComponent
  }
];

export let myOrdersRouterComponents = [MyOrdersComponent, OrderListComponent];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  providers: [
    CanDeactivateGuard
  ]
})
export class MyOrdersRoutingModule { }
