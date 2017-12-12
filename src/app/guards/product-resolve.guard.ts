import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { Product } from './../models/';
import { ProductsService } from './../services/';

@Injectable()
export class ProductResolveGuard implements Resolve<Product> {

  constructor(
    private productsService: ProductsService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot): Promise<Product> | null {
    const id = +route.paramMap.get('id');

    return this.productsService.getProduct(id).then(product => {
      if (id === 0) {
        return new Product(null, null, null, null, null, null, null, null, null, null);
      }
      if (product) {
        return product;
      } else { // id not found
        this.router.navigate(['../']);
        return null;
      }
    });
  }
}
