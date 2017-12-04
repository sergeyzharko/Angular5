import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { CartService } from '../services/cart.service';
import { Item } from '../models/cart-item.model';
import { CartItemComponent } from '../cart-item/cart-item.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items: Array<Item> = [];
  values;

  @ViewChild(CartItemComponent)
  private item: CartItemComponent;

  constructor(
    public cartService: CartService,
    private router: Router
  ) {}

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

  close() {
    this.router.navigate([{ outlets: { popup: null } }]);
    this.cartService.isDisplayed = false;
  }


}