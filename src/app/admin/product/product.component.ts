import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { DialogService } from './../../services/dialog.service';

import { CanComponentDeactivate } from './../../guards/can-component-deactivate.interface';
import { Product, Category } from '../../models/';
import { ProductsService } from '../../services/';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, CanComponentDeactivate {
  product: Product;
  originalProduct: Product;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public productsService: ProductsService,
    private dialogService: DialogService
  ) { }

  ngOnInit() {
    // const id = this.route.snapshot.paramMap.get('id');
    // if (Boolean(Number(id))) {
    //   this.productsService.getProduct(id).then( product => {
    //     this.product = product;
    //   } );
    // } else {
    //   this.product = new Product(null, null, null, null, null, null, null, null, null, null);
    // }

    this.product = new Product(null, null, null, null, null, null, null, null, null, null);

    // Был ли отредактирован (для гуарда)
    this.route.data.subscribe(data => {
      this.product = Object.assign({}, data.product);
      this.originalProduct = Object.assign({}, data.product);
    });
  }

  saveProduct() {
    this.product.updateDate = new Date();
    if (this.product.id) {
      this.productsService.updateProduct(this.product).then(
        () => {
          // Последний отредактированный
          this.router.navigate(['/admin/products', {id: this.product.id}]);
          this.originalProduct = Object.assign({}, this.product);
        }
      );
    } else {
      this.productsService.addProduct(this.product);
      this.originalProduct = Object.assign({}, this.product);
      this.goBack();
    }
  }

  goBack() {
    this.router.navigate(['/admin/products']);
  }

  // Для гуарда
  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    const flags = [];
    for (const key in this.originalProduct) {
      if (this.originalProduct[key] === this.product[key]) {
        flags.push(true);
      } else {
        flags.push(false);
      }
    }

    if (flags.every(el => el)) {
      return true;
    }
    return this.dialogService.confirm('Discard changes?');
  }

}
