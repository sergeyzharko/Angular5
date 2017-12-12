import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule, usersRouterComponents } from './users.routing.module';
import { UserComponent } from '.';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UsersRoutingModule
  ],
  declarations: [
    usersRouterComponents,
    UserComponent
  ]
})
export class UsersModule {}
