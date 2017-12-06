import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';

import { Customer } from '../../models/';
import { CartService } from '../../services/';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
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
