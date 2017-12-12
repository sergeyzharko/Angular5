import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { Product, Category } from '../../models/';
import { ProductsService, CartService } from '../../services/';
import { OrderPipe } from '../pipes/order-by.pipe';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: [OrderPipe]
})
export class ProductListComponent implements OnInit {
  products: Array<Product>;

  selectedName: string;
  orderField = 'name';
  direction: boolean;

  constructor( // Reserve the constructor for simple initialization such as wiring constructor parameters to properties.
    public productsService: ProductsService,
    public cartService: CartService,
    private orderPipe: OrderPipe
  ) { }

  ngOnInit() {
    this.cartService.getProducts().then(() => this.getProducts());
  }

  getProducts(): void {
    this.productsService.getProducts()
    .then(products => {
      this.products = products; this.onOrder();
    })
    .catch(() => Promise.reject('Error in getProducts method'));
  }

  onBuy(product: Product): void {
    product.bought = true;
    this.cartService.addBoughtProduct(product);
  }

  onSelect(product) {
    if (this.selectedName === product.name) {this.selectedName = undefined; } else {
      this.selectedName = product.name;
    }
  }

  setClasses(product) {
    const classes = {
      'panel-heading': true,
      notavailable: !product.isAvailable,
      new: !product.bought && product.isAvailable,
      selected: this.selectedName === product.name,
      added: product.bought
    };

    return classes;
  }

  outOfStock(product) {
    if (!product.isAvailable) {
      return {
        border: '4px solid red',
        margin: '0px 0px 0px 10px'
      };
    }
  }

  onOrder() {
    this.products = this.orderPipe.transform(this.products, this.orderField, this.direction);
  }

}
