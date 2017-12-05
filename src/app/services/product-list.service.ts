import { Injectable } from '@angular/core';

import { Product, Category } from '../models/product.model';

const productList = [
  new Product(1, 'Bread', 'This is my first bread', 0.32, 12, Category.A, true, ['flour', 'water'], ['bun', 'sandwich'], false),
  new Product(2, 'Milk', 'Very tasty milk', 0.51, 8, Category.B, true, ['cow'], ['kefir', 'ryazhenka'], false),
  new Product(3, 'Candies', 'Sweet candies', 2, 5, Category.A, false, ['chocolate', 'milk'], ['marshmallows', 'wafers'], false)
];

const productListPromise = Promise.resolve(productList);

@Injectable() // decorator tells Angular that this service might itself have injected dependencies
export class ProductsService {
  products: Array<Product>;

  getProducts(): Promise<Product[]> {
    return productListPromise;
  }

  getProduct(id: number | string): Promise<Product> {
    return this.getProducts()
      .then(products => products.find(product => product.id === +id))
      .catch(() => Promise.reject('Error in getProduct method'));
  }

  addProduct(product: Product): void {
    let maxId;
    this.getProducts()
    .then(products => {
      this.products = products;
      maxId = 1;
      for ( let i = 0; i < this.products.length; i++ ) {
        if ( this.products[i].id > maxId ) { maxId = this.products[i].id; }
      }
      product.id = maxId + 1;
      productList.push(product);
    })
    .catch(() => Promise.reject('Error in getProducts method'));
  }

  removeProduct(product: Product): void {
    productList.splice(productList.indexOf(product), 1);
  }

  updateProduct(product: Product): void {
    let i = -1;

    productList.forEach((item, index) => {
      if (item.id === product.id ) {
        i = index;
        return false;
      }
    });

    if (i > -1) {
      productList.splice(i, 1, product);
    }
  }

  outOfStock(product: Product): void {
    product.isAvailable = false;
  }
}
