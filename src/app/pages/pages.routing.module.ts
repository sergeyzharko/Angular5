import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent, LoginComponent, NewsComponent, PageNotFoundComponent } from '.';

const routes: Routes = [
    {
        path: '',
        component: LoginComponent,
        children: [
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
            // The router will match this route if the URL requested
            // doesn't match any paths for routes defined in our configuration
            path: '**',
            component: PageNotFoundComponent,
            data: { title: 'Page Not Found' }
        }
    ]}
];

export let pagesRouterComponents = [AboutComponent, LoginComponent, NewsComponent, PageNotFoundComponent];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
