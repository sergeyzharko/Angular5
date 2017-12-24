import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { UserFormComponent } from './user-form.component';
import { ValidatorsModule } from './../validators/validators.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ValidatorsModule
  ],
  exports: [
    UserFormComponent
  ],
  declarations: [
    UserFormComponent
  ]
})
export class UserFormModule {}
