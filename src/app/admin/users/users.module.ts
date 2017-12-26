import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule, usersRouterComponents } from './users.routing.module';
import { UserComponent } from '.';
import { UserFormModule } from './../../user-form/user-form.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UsersRoutingModule,
    UserFormModule
  ],
  declarations: [
    usersRouterComponents,
    UserComponent
  ]
})
export class UsersModule {}
