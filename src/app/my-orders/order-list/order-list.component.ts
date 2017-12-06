import { Component, OnInit } from '@angular/core';
import { Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { Order } from './../../models';
import { OrderArrayService, AuthService } from './../../services';

@Component({
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  orders: Array<Order>;

  constructor(
    private orderArrayService: OrderArrayService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    if (this.authService.isLoggedIn) {
      this.orderArrayService.getOrders()
      .then(orders => this.orders = orders.filter((order) => order.userId === this.authService.currentUser.id))
      .catch((err) => console.log(err));
    }
  }

}
