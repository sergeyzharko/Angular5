import { Component, EventEmitter, Input, Output, HostBinding, HostListener } from '@angular/core';

import { Product, Category } from './../models/product.model';

@Component({
  selector: 'app-one-product',
  templateUrl: './one-product.component.html'
})
export class OneProductComponent {
    @Input() product: Product;
    @Output() buy: EventEmitter<Product> = new EventEmitter<Product>();

    @HostBinding('class') class = 'product';

    constructor() {}

    onBuy() {
      console.log(`Item bought`);
      this.buy.emit(this.product);
  }
}
