import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { Order } from './../models';
import { OrderArrayService } from './../services';

@Injectable()
export class OrderResolveGuard implements Resolve<Order> {

  constructor(
    private orderArrayService: OrderArrayService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot): Promise<Order> | null {
    const id = +route.paramMap.get('id');

    return this.orderArrayService.getOrder(id).then(order => {
      if (order) {
        return order;
      } else { // id not found
        this.router.navigate(['/orders']);
        return null;
      }
    });
  }
}
