import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderPipe implements PipeTransform {

  transform(arr, field: string, direction: boolean = true) {
    return arr.sort(function (a, b) {
      if (a[field] >= b[field]) {
        return 1 * (direction ? 1 : -1);
      }
      if (a[field] < b[field]) {
        return -1 * (direction ? 1 : -1);
      }
      return 0;
    });
  }

}
