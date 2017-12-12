import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { Customer } from './cart.model';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CartComponent implements OnInit {
  names: Array<string>;

  customer = new Customer();

  constructor( public cartService: CartService ) {}

  ngOnInit() {
    this.names = this.cartService.getBoughtProducts();
  }

  onRemove(name) {
    this.names.splice(this.names.indexOf(name), 1);
    console.log('Removed: ' + name);
  }

}
