import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersComponent, UserListComponent } from '.';
import { CanDeactivateGuard, UserResolveGuard } from './../../guards';
import { UserFormComponent } from './../../user-form/user-form.component';

const routes: Routes = [
  {
    path: 'users',
    component: UsersComponent,
    children: [
      {
        path: 'add',
        component: UserFormComponent,
        data: { title: 'Register' }
      },
      {
        path: 'edit/:id',
        component: UserFormComponent,
        canDeactivate: [CanDeactivateGuard],
        resolve: {
          user: UserResolveGuard
        }
      },
      {
        path: '',
        component: UserListComponent
      }
    ]
  }
];

export let usersRouterComponents = [UsersComponent, UserListComponent];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  providers: [
    CanDeactivateGuard,
    UserResolveGuard
  ]
})
export class UsersRoutingModule { }
