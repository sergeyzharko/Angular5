import { Component, OnInit } from '@angular/core';

import { Product, Category } from './models/product.model';
import { ProductsService } from './services/products.service';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {
  products: Array<Product>;
  
  constructor(
    public productsService: ProductsService
  ) { }

  ngOnInit() {
    this.products = this.productsService.getProducts();
  }

}
