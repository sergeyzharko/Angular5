import { Injectable } from '@angular/core';

import { Options } from './../models';

@Injectable()
export class ConfigOptionsService {

  constructor( ) { }

  options: Options = {
    login: '',
    id: '',
    email: ''
  };

  setOptions( inOptions: Options ): void {
    this.options.login = inOptions.login;
    this.options.id = inOptions.id;
    this.options.email = inOptions.email;
  }

  getOptions(): Options {
    return this.options;
  }

}
