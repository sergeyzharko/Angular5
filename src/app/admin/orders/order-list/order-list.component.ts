import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { Order } from './../../../models';
import { OrderArrayService } from './../../../services';

@Component({
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit, OnDestroy {
  orders: Array<Order>;
  private editedOrder: Order;

  constructor(
    private orderArrayService: OrderArrayService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.orderArrayService.getOrders()
      .then(orders => this.orders = orders)
      .catch((err) => console.log(err));

    // listen id from OrderFormComponent
    this.route.paramMap
    .switchMap((params: Params) => this.orderArrayService.getOrder(+params.get('id')))
    .subscribe(
      (order: Order) => {
        this.editedOrder = Object.assign({}, order);
        console.log(`Last time you edit order ${JSON.stringify(this.editedOrder)}`);
      },
      (err) => console.log(err)
    );

  }

  ngOnDestroy() {
  }

  isEdited(order: Order) {
    if (this.editedOrder) {
      return order.id === this.editedOrder.id;
    }
    return false;
  }

}
