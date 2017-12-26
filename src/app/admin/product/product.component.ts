import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { DialogService } from './../../services/dialog.service';

import { CanComponentDeactivate } from './../../guards/can-component-deactivate.interface';
import { Product, Category, Producer } from '../../models/';
import { ProductsService } from '../../services/';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, CanComponentDeactivate {
  product: Product;
  originalProduct: Product;
  categories = ['food', 'drink', 'other'];
  existError: String;

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

    this.product = new Product();
    this.product.producer = new Producer();

    // Был ли отредактирован (для гуарда)
    this.route.data.subscribe(data => {
      this.product = Object.assign(this.product, data.product);
      this.originalProduct = Object.assign(this.product, data.product);
    });
  }

  saveProduct(productForm: NgForm) {
    Object.assign(this.product, productForm.form.value);
    console.log(productForm.form.value);
    this.product.updateDate = new Date();
    if (this.product.id) {
      this.productsService.updateProduct(this.product).then(
        () => {
          // Последний отредактированный
          this.originalProduct = Object.assign({}, this.product);
          this.router.navigate(['/admin/products', {id: this.product.id}]);
        }
      );
    } else {
      this.productsService.addProduct(this.product).then(
        () => {
          this.originalProduct = Object.assign({}, this.product);
          this.goBack();
        }
      );
    }
  }

  productNameExists(newName) {
    if ( !this.product.id ) {
      this.productsService.productNameExists(newName).then( flag => {
        flag ? this.existError = 'Product name already exists' : this.existError = undefined;
      });
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
