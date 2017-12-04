import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent, OrdersComponent, ProductComponent, ProductListComponent } from '.';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,

  },
    {
      path: 'admin/orders',
      component: OrdersComponent
    },
    {
      path: 'admin/products/:id',
      component: ProductComponent
    },
    {
      path: 'admin/products',
      component: ProductListComponent

    // children: [
    //   {
    //     path: 'orders',
    //     component: OrdersComponent,
    //     outlet: 'admin'
    //   },
    //   {
    //     path: 'products/:id',
    //     component: ProductComponent,
    //     outlet: 'admin'
    //   },
    //   {
    //     path: 'products',
    //     component: ProductListComponent,
    //     outlet: 'admin'
    //   },
    //   {
    //     path: '',
    //     redirectTo: 'products',
    //     pathMatch: 'full'
    //   }
    // ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
