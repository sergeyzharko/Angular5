import { Component, OnInit, OnDestroy } from '@angular/core';
import { Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Subscription } from 'rxjs/Subscription';

import { Order } from './../../models';
import { OrderArrayService, AuthService } from './../../services';

@Component({
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit, OnDestroy {
  orders: Array<Order>;
  errorMessage: string;
  private subscription: Subscription[] = [];

  constructor(
    private orderArrayService: OrderArrayService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    if (this.authService.isLoggedIn) {
      const sub = this.orderArrayService.getOrders()
        .subscribe(
          orders => this.orders = orders.filter((order) => order.userId === this.authService.currentUser.id),
          error => this.errorMessage = <any>error
        );
      this.subscription.push(sub);
    }
  }

  ngOnDestroy() {
    this.subscription.forEach(sub => sub.unsubscribe());
  }

}
