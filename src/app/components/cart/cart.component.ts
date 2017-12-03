import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';

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

  @ViewChild(CartItemComponent)
  private item: CartItemComponent;

  constructor( public cartService: CartService ) {}

  ngOnInit() {
    this.cartService.getProducts().then(() => {
      this.items = this.cartService.boughtProducts;
      this.values = this.cartService.values;
    });
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

  clear() {
    while (this.items.length) {
      this.item.onRemove();
    }
  }

}
