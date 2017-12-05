import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent, OrdersComponent, ProductComponent, ProductListComponent, UsersModule } from '.';
import { AuthGuard, CanDeactivateGuard, ProductResolveGuard } from './../guards';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '', // для группировки и приминения Guard
        canActivateChild: [AuthGuard],
        children: [
          {
            path: 'orders',
            component: OrdersComponent,
            data: { title: 'Orders' }
          },
          {
            path: 'products/edit/:id',
            component: ProductComponent,
            canDeactivate: [CanDeactivateGuard],
            resolve: {
              product: ProductResolveGuard
            },
            data: { title: 'Edit Product' }
          },
          {
            path: 'products',
            component: ProductListComponent,
            data: { title: 'Products' }
          },
          {
            path: '',
            redirectTo: 'products',
            pathMatch: 'full'
          }
        ]
      }
    ]
  }
];

export let adminRouterComponents = [OrdersComponent, ProductComponent, ProductListComponent];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  providers: [
    CanDeactivateGuard,
    ProductResolveGuard
  ]
})
export class AdminRoutingModule {}
