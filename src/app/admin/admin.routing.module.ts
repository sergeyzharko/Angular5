import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent, OrdersComponent, ProductComponent, ProductListComponent } from '.';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: 'orders',
        component: OrdersComponent
      },
      {
        path: 'products/edit/:id',
        component: ProductComponent
      },
      {
        path: 'products',
        component: ProductListComponent
      },
      {
        path: '',
        redirectTo: 'products',
        pathMatch: 'full'
      }
    ]
  }
];

export let adminRouterComponents = [OrdersComponent, ProductComponent, ProductListComponent];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
