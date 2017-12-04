import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { Product, Category } from '../../products/models/product.model';
import { ProductsService } from '../../products/services/product-list.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  product: Product;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public productsService: ProductsService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (Boolean(Number(id))) {
      this.productsService.getProduct(id).then( product => {
        this.product = product;
        console.log(this.product);
      } );
    } else {
      this.product = new Product(null, null, null, null, null, null, null, null, null, null);
    }
  }

  saveProduct() {
    this.product.updateDate = new Date();
    if (this.product.id) {
      this.productsService.updateProduct(this.product);
      this.router.navigate(['/admin/products', {id: this.product.id}]);
    } else {
      this.productsService.addProduct(this.product);
      this.goBack();
    }
  }

  goBack() {
    this.router.navigate(['/admin/products']);
  }

}
