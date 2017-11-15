import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { Customer } from './cart.model';
import { CartService } from './cart.service';
import { Item } from './../components/cart-item/cart-item.model';

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

}
