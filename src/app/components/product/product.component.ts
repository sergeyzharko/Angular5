import { Component, EventEmitter, Input, Output, HostBinding, HostListener, SimpleChanges } from '@angular/core';

import { Product, Category } from './product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
    styleUrls: ['./product.component.css']
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

    ngOnChanges(changes: SimpleChanges) {
        console.log(`Selected Product: ${changes.product.currentValue.name}`);
    }

    outOfStock() {
        alert("Sorry, product is out of stock...");
    }

}