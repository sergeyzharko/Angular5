import { Injectable } from '@angular/core';

import { Product, Category } from './../models/product.model';

@Injectable()
export class ProductsService {

  constructor() { }

  getProducts(): Array<Product> {
    return [
      new Product('Bread', 'This is my first bread', 3, Category.A, true, ['flour', 'water'], ['bun', 'sandwich']),
      new Product('Milk', 'Very tasty milk', 6, Category.B, true, ['cow'], ['kefir', 'ryazhenka'])
    ];
  }

}