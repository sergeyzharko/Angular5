import { Injectable } from '@angular/core';

import { Product, Category } from './../components/product';
import { ProductsService } from './../components/product-list';

@Injectable()
export class CartService {

  constructor(
    public productsService: ProductsService
  ) { }

  boughtProducts: Array<string>;

  getBoughtProducts(): Array<string> {
    this.boughtProducts = [];
    let allProducts: Array<Product>;
    allProducts = this.productsService.getProducts();

    for (let i = 0; i < allProducts.length; i++) {
        if (allProducts[i].bought) this.boughtProducts.push(allProducts[i].name);
    }
    
    return this.boughtProducts;
  }

  addBoughtProduct(product): void {
    this.boughtProducts.push(product.name)
  }

}