import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {Router} from '@angular/router';

import { Product, Category } from '../../products/models/product.model';
import { ProductsService } from '../../products/services/product-list.service';
import { OrderPipe } from '../../products/pipes/order-by.pipe';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: [OrderPipe]
})
export class ProductListComponent implements OnInit {
  products: Array<Product>;

  selectedName: string;
  direction: boolean;

  constructor( // Reserve the constructor for simple initialization such as wiring constructor parameters to properties.
    public productsService: ProductsService,
    private orderPipe: OrderPipe,
    private router: Router
  ) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts(): void {
    this.productsService.getProducts()
    .then(products => {
      this.products = products; this.onOrder();
    })
    .catch(() => Promise.reject('Error in getProducts method'));
  }

  onRemove(product): void {
    this.productsService.removeProduct(product);
  }

  onEdit(product): void {
    // const link = `admin/(admin:products/${product.id})`;
    const link = `admin/products/${product.id}`;
    this.router.navigateByUrl(link);
  }

  onNew(): void {
    // const link = `admin/(admin:products/0)`;
    const link = `admin/products/0`;
    this.router.navigateByUrl(link);
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

  onOrder() {
    this.products = this.orderPipe.transform(this.products, 'name', Boolean(this.direction));
  }

}
