import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent, OrdersComponent, ProductComponent, ProductListComponent } from '.';
import { AuthGuard } from './../guards/auth.guard';
import { CanDeactivateGuard } from './../guards/can-deactivate.guard';
import { ProductResolveGuard } from './../guards/product-resolve.guard';

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
            component: OrdersComponent
          },
          {
            path: 'products/edit/:id',
            component: ProductComponent,
            canDeactivate: [CanDeactivateGuard],
            resolve: {
              product: ProductResolveGuard
            }
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
