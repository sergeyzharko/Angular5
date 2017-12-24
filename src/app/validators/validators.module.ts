import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import AsyncLoginValidatorDirective from './async-login-validator.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    AsyncLoginValidatorDirective
  ],
  exports: [
    AsyncLoginValidatorDirective
  ]
})
export class ValidatorsModule { }
