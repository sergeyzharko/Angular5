import { Injectable } from '@angular/core';

import { Product, Category } from '../product/product.model';

@Injectable() // decorator tells Angular that this service might itself have injected dependencies
export class ProductsService {

  constructor() { }

  getProducts(): Array<Product> {
    return [
      new Product('Bread', 'This is my first bread', 3, Category.A, true, ['flour', 'water'], ['bun', 'sandwich'], false),
      new Product('Milk', 'Very tasty milk', 6, Category.B, true, ['cow'], ['kefir', 'ryazhenka'], false),
      new Product('Candies', 'Sweet candies', 6, Category.A, false, ['chocolate', 'milk'], ['marshmallows', 'wafers'], false)
    ];
  }

}