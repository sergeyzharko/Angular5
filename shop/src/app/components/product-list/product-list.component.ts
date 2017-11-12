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

}
