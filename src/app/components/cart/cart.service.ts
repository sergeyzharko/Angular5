import { Injectable } from '@angular/core';

import { Product, Category } from './../product';
import { Item } from './../cart-item/cart-item.model';
import { LocalStorageService } from './../../services';

@Injectable()
export class CartService {

  constructor( public localStorageService: LocalStorageService ) { }

  boughtProducts: Array<Item> = [];
  values = {
    totalQuantity: 0,
    amount: 0
  };

  async getProducts() {
    this.boughtProducts = await JSON.parse(this.localStorageService.getItem('Bought Products'));
  }

  addBoughtProduct(product): void {
    for (const item of this.boughtProducts) {
      if (item.name === product.name) {
        item.quantity++;
        this.values.totalQuantity++;
        return;
      }
    }
    this.boughtProducts.push({
      name: product.name,
      quantity: 1,
      price: product.price
    });
    this.update();
  }

  onRemove(item) {
    this.boughtProducts.splice(this.boughtProducts.indexOf(item), 1);
    this.update();
  }

  onIncrement(item) {
    this.boughtProducts[this.boughtProducts.indexOf(item)].quantity++;
    this.update();
  }

  onDecrement(item) {
    if ( this.boughtProducts[this.boughtProducts.indexOf(item)].quantity > 1 ) {
      this.boughtProducts[this.boughtProducts.indexOf(item)].quantity--;
      this.update();
    } else { this.onRemove(item); }
  }

  update() {
    this.localStorageService.setItem('Bought Products', JSON.stringify(this.boughtProducts));

    let sum = 0;
    let quantity = 0;
    for (const item of this.boughtProducts) {
      sum = sum + item.quantity * item.price;
      quantity = quantity + item.quantity;
    }
    this.values.amount = sum;
    this.values.totalQuantity = quantity;
  }

}
