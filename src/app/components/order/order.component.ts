import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';

import { Customer } from './order.model';
import { CartService } from './../cart/cart.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class OrderComponent implements OnInit {
  values;

  customer = new Customer();

  constructor( public cartService: CartService ) {}

  ngOnInit() {
    this.values = this.cartService.values;
  }

  buy(name: string, city: string, adress: string) {
    alert('Congratulations! Your order is formed!');
  }

}
