import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';

import { Customer } from './cart.model';
import { CartService } from './cart.service';
import { Item, CartItemComponent } from './../cart-item';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CartComponent implements OnInit {
  items: Array<Item> = [];
  values;

  customer = new Customer();

  @ViewChild(CartItemComponent)
  private item: CartItemComponent;

  constructor( public cartService: CartService ) {}

  ngOnInit() {
    this.items = this.cartService.boughtProducts;
    this.values = this.cartService.values;
  }

  onRemove(item) {
    this.cartService.onRemove(item);
  }

  onIncrement(item) {
    this.cartService.onIncrement(item);
  }

  onDecrement(item) {
    this.cartService.onDecrement(item);
  }

  buy(name: string, city: string, adress: string) {
    alert("Congratulations! Your order is formed!");
  }

  clear() {
    while(this.items.length) {
      this.item.onRemove();
    }
    console.log('Cart is clear');
  }

}
