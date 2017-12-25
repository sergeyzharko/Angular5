import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules, ExtraOptions } from '@angular/router';

import { CustomPreloadingStrategyService } from './services';
import { AboutComponent, NewsComponent, LoginComponent, PageNotFoundComponent } from './pages';
import { AuthGuard } from './guards/auth.guard';
import { UserFormComponent } from './user-form/user-form.component';

const routes: Routes = [
  {
    path: 'news',
    component: NewsComponent
  },
  {
    path: 'about',
    component: AboutComponent,
    data: { title: 'About' }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { preload: true, title: 'Login' }
  },
  {
    path: 'register',
    component: UserFormComponent,
    // component: RegisterComponent,
    data: { title: 'Register' }
  },
  {
    path: 'update',
    component: UserFormComponent,
    // component: RegisterComponent,
    data: { title: 'Update Profile' }
  },
  {
    path: 'admin',
    canLoad: [AuthGuard],
    loadChildren: 'app/admin/admin.module#AdminModule', // Lazy-Loading  (Asynchronous Routing)
    data: { title: 'Admin' }
  },
  {
    path: 'products',
    loadChildren: 'app/products/products.module#ProductsModule', // Lazy-Loading  (Asynchronous Routing)
    data: { title: 'Products' }
  },
  {
    path: 'cart',
    loadChildren: 'app/cart/cart.module#CartModule', // Lazy-Loading  (Asynchronous Routing)
    data: { title: 'Cart' }
  },
  {
    path: 'myorders',
    loadChildren: 'app/my-orders/my-orders.module#MyOrdersModule', // Lazy-Loading  (Asynchronous Routing)
    data: { title: 'My Orders' }
  },
  {
    path: '',
    redirectTo: '/products',
    pathMatch: 'full'
  },
  {
    // The router will match this route if the URL requested
    // doesn't match any paths for routes defined in our configuration
    path: '**',
    component: PageNotFoundComponent,
    data: { title: 'Page Not Found' }
  }
];

const extraOptions: ExtraOptions = {
  preloadingStrategy: PreloadAllModules // PreloadAllModules, // Загружать все модули сразу
  // enableTracing: true // Makes the router log all its internal events to the console.
};

@NgModule({
  imports: [
    RouterModule.forRoot(routes, extraOptions)
  ],
  providers: [
    CustomPreloadingStrategyService
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
