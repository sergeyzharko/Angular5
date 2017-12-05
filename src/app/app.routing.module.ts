import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules, ExtraOptions } from '@angular/router';

import { CustomPreloadingStrategyService } from './services';
import { AboutComponent, HomeComponent, LoginComponent, PageNotFoundComponent } from './components';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { preload: true }
  },
  {
    path: 'admin',
    canLoad: [AuthGuard],
    loadChildren: 'app/admin/admin.module#AdminModule' // Lazy-Loading  (Asynchronous Routing)
  },
  {
    path: 'products',
    loadChildren: 'app/products/products.module#ProductsModule' // Lazy-Loading  (Asynchronous Routing)
  },
  {
    path: 'cart',
    loadChildren: 'app/cart/cart.module#CartModule' // Lazy-Loading  (Asynchronous Routing)
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    // The router will match this route if the URL requested
    // doesn't match any paths for routes defined in our configuration
    path: '**',
    component: PageNotFoundComponent
  }
];

export let appRouterComponents = [AboutComponent, HomeComponent, LoginComponent, PageNotFoundComponent];

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
