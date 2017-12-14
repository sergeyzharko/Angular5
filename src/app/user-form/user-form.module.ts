import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { UserFormComponent } from './user-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    UserFormComponent
  ],
  declarations: [
    UserFormComponent
  ]
})
export class UserFormModule {}
