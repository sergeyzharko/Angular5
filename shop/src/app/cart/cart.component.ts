import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CartComponent implements OnInit {
  names: Array<string>;

  constructor( public cartService: CartService ) {}

  ngOnInit() {
    this.names = this.cartService.getBoughtProducts();
  }

}
