import { Component, EventEmitter, Input, Output, HostBinding, HostListener } from '@angular/core';

import { Product, Category } from './product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html'
})
export class ProductComponent {
    @Input() product: Product;
    @Output() buy: EventEmitter<Product> = new EventEmitter<Product>();

    @HostBinding('class') class = 'product';

    constructor() {}

    onBuy() {
      console.log(`Item bought`);
      this.buy.emit(this.product);
  }
}