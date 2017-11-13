import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { Product, Category } from '../product/';
import { ProductsService } from './product-list.service';
import { CartService } from './../../cart/';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {
  products: Array<Product>;
  @Output() buy: EventEmitter<Product> = new EventEmitter();

  selectedName: string;
  
  constructor(
    public productsService: ProductsService,
    public cartService: CartService
  ) { }

  ngOnInit() {
    this.products = this.productsService.getProducts();
  }

  onBuy(product: Product): void {
    console.log('product-list component, buy method', product);
    product.bought = true;
    this.cartService.addBoughtProduct(product);
  }

  onSelect(product) {
    if (this.selectedName === product.name) {this.selectedName = undefined} else {
      this.selectedName = product.name;
      console.log(`${this.selectedName} was selected`);
    }
  }

}
