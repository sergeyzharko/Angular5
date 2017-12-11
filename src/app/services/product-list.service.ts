import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Product, Category } from '../models/product.model';

// const productList = [
//   new Product(1, 'Bread', 'This is my first bread', 0.32, 12, Category.A, true, ['flour', 'water'], ['bun', 'sandwich'], false),
//   new Product(2, 'Milk', 'Very tasty milk', 0.51, 8, Category.B, true, ['cow'], ['kefir', 'ryazhenka'], false),
//   new Product(3, 'Candies', 'Sweet candies', 2, 5, Category.A, false, ['chocolate', 'milk'], ['marshmallows', 'wafers'], false)
// ];

// const productListPromise = Promise.resolve(productList);

@Injectable() // decorator tells Angular that this service might itself have injected dependencies
export class ProductsService {
  products: Array<Product>;
  private productsUrl = 'products';

  // getProducts(): Promise<Product[]> {
  //   return productListPromise;
  // }

  constructor(
    private http: HttpClient
  ) {}

  getProducts(): Promise<Product[]> {
    return this.http.get(this.productsUrl)
            .toPromise()
            .then( response => <Product[]>response)
            .catch(this.handleError);
  }

  // getProduct(id: number | string): Promise<Product> {
  //   return this.getProducts()
  //     .then(products => products.find(product => product.id === +id))
  //     .catch(() => Promise.reject('Error in getProduct method'));
  // }

  getProduct(id: number | string): Promise<Product> {
    return this.http.get(`${this.productsUrl}/${id}`)
            .toPromise()
            .then( response => <Product>response)
            .catch(this.handleError);
  }

  newId(): number {
    let maxId, newId;
    this.getProducts()
    .then(products => {
      this.products = products;
      maxId = 1;
      for ( let i = 0; i < this.products.length; i++ ) {
        if ( this.products[i].id > maxId ) { maxId = this.products[i].id; }
      }
      newId = maxId + 1;
    }).catch(() => Promise.reject('Error in getProducts method'));
    return newId;
  }

  addProduct(product: Product): Promise<any> {
    product.id = this.newId();
  //    productList.push(product);
    const url = this.productsUrl,
    body = JSON.stringify(product),
    options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    return this.http.post(url, body, options)
        .toPromise()
        .then( response => <Product>response )
        .catch( this.handleError );
  }

  removeProduct(product: Product): Promise<Product[]> {
    // productList.splice(productList.indexOf(product), 1);

    const url = `${this.productsUrl}/${product.id}`;

    return this.http.delete(url)
            .toPromise()
            .then( response => <Product>response)
            .catch( this.handleError );
    }

  // updateProduct(product: Product): void {
  //   let i = -1;

  //   productList.forEach((item, index) => {
  //     if (item.id === product.id ) {
  //       i = index;
  //       return false;
  //     }
  //   });

  //   if (i > -1) {
  //     productList.splice(i, 1, product);
  //   }
  // }

  updateProduct(product: Product): Promise<Product> {
    const url = `${this.productsUrl}/${product.id}`,
      body = JSON.stringify(product),
      options = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      };

    return this.http.put(url, body, options)
            .toPromise()
            .then( response => <Product>response )
            .catch( this.handleError );
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
