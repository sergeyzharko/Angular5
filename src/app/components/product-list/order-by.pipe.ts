import { Pipe, PipeTransform } from '@angular/core';

import { Product, Category } from '../product/';

@Pipe({
  name: 'orderBy'
})
export class OrderPipe implements PipeTransform {

  transform(products: Array<Product>, field: string, direction: boolean = true): Array<Product> {
    return products.sort(function (a, b) {
      if (a[field] > b[field]) {
        return 1 * (direction ? 1 : -1);
      }
      if (a[field] < b[field]) {
        return -1 * (direction ? 1 : -1);
      }
      return 0;
    });
  }

}
