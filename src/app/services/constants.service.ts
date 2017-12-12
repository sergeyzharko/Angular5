import { Injectable } from '@angular/core';

@Injectable()
export class ConstantsService {

  constructor() { }

  getData() {
    return { App: 'TaskManager', Ver: '1.0' };
  }

}
