import { Injectable } from '@angular/core';

@Injectable()
export class GeneratorService {

  constructor() { }

  getString(l: number) {
    let result         = '';
    const words        = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
    const max_position = words.length - 1;
        for ( let i = 0; i < l; ++i ) {
            const position = Math.floor ( Math.random() * max_position );
            result = result + words.substring(position, position + 1);
        }
    return result;
  }

}
