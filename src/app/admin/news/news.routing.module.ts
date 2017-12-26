import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewsComponent, NewsListComponent, NewsFormComponent, OneNewsComponent } from '.';
import { CanDeactivateGuard, NewsResolveGuard } from './../../guards';

const routes: Routes = [
  {
    path: 'news',
    component: NewsComponent,
    children: [
      {
        path: 'add',
        component: NewsFormComponent,
        data: { title: 'New News' }
      },
      {
        path: 'edit/:id',
        component: NewsFormComponent,
        canDeactivate: [CanDeactivateGuard],
        resolve: {
          user: NewsResolveGuard
        }
      },
      {
        path: '',
        component: NewsListComponent
      }
    ]
  }
];

export let newsRouterComponents = [NewsComponent, NewsListComponent, NewsFormComponent, OneNewsComponent];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  providers: [
    CanDeactivateGuard,
    NewsResolveGuard
  ]
})
export class NewsRoutingModule { }
