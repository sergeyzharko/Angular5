import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Subscription } from 'rxjs/Subscription';

import { Order } from './../../../models';
import { OrderArrayService } from './../../../services';

@Component({
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit, OnDestroy {
  orders: Array<Order>;
  private editedOrder: Order;
  errorMessage: string;
  private subscription: Subscription[] = [];

  constructor(
    private orderArrayService: OrderArrayService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const sub = this.orderArrayService.getOrders()
      .subscribe(
        users => this.orders = users,
        error => this.errorMessage = <any>error
      );
    this.subscription.push(sub);

    // listen id from OrderFormComponent
    let id;
    this.route.paramMap.subscribe( params => { id = params.get('id'); });
    if (id) {
      this.route.paramMap
      .switchMap((params: Params) => this.orderArrayService.getOrder(+params.get('id')))
      .subscribe(
        (user: Order) => {
          this.editedOrder = Object.assign({}, user);
          console.log(`Last time you edit user ${JSON.stringify(this.editedOrder)}`);
        },
        (err) => console.log(err)
      );
    }
  }

  ngOnDestroy() {
    this.subscription.forEach(sub => sub.unsubscribe());
  }

  isEdited(order: Order) {
    if (this.editedOrder) {
      return order.id === this.editedOrder.id;
    }
    return false;
  }

  deleteOrder(order: Order) {
    this.orderArrayService.deleteOrder(order)
    .subscribe(
      () => this.orders = this.orders.filter(u => u !== order),
      err => console.log(err)
    );
  }

}
