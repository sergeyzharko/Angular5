import { InjectionToken } from '@angular/core';
import { GeneratorService } from '.';

export const Random5 = new InjectionToken<any[]>('Random5');

export function RandomN(take: number) {

  return function(data: GeneratorService): string {
    return data.getString(take);
  };

}
