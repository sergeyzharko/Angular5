import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { Product, Category } from '../product/';
import { ProductsService } from './product-list.service';
import { CartService } from './../cart/';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Array<Product>;

  selectedName: string;
  
  constructor( // Reserve the constructor for simple initialization such as wiring constructor parameters to properties.
    public productsService: ProductsService,
    public cartService: CartService
  ) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts(): void {
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
      // console.log(`${this.selectedName} was selected`);
    }
  }

  setClasses(product) {
    let classes = {
      "panel-heading": true,
      notavailable: !product.isAvailable,
      new: !product.bought && product.isAvailable,
      selected: this.selectedName === product.name,
      added: product.bought
    }
    return classes;
  }

  outOfStock(product) {
    if (!product.isAvailable) {
      return {
        border: "4px solid red",
        margin: "0px 0px 0px 10px"
      }
    }
  }

}
