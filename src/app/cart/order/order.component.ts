import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';

import { Order, User, Status, OrderStatus } from '../../models/';
import { CartService, UserArrayService, AuthService, OrderArrayService } from '../../services/';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  values;

  constructor(
    public cartService: CartService,
    public userArrayService: UserArrayService,
    public orderArrayService: OrderArrayService,
    public authService: AuthService,
    public router: Router
  ) {}

  newUserId = this.userArrayService.getNewId();
  newLoginId = this.orderArrayService.getNewId();

  customer = new User(this.newUserId, '', '', '', '', '', false);
  isLoggedIn: boolean;
  order: Order;
  orderStatus = new OrderStatus(1, '', Status.A);

  ngOnInit() {
    this.values = this.cartService.values;
    this.isLoggedIn = this.authService.isLoggedIn;

    if ( this.isLoggedIn ) {
      this.customer = this.authService.currentUser;
    } else {
      this.customer = new User(this.newUserId, '', '', '', '', '', false);
    }
  }

  buy() {
    if ( !this.isLoggedIn ) {
      this.userArrayService.getUserByLogin(this.customer.login).then(
        (saveCustomer) => {
          if (saveCustomer && this.customer.login === saveCustomer.login) { alert('This login is already taken'); } else {
            this.userArrayService.addUser(this.customer).then(() => this.authService.login(this.customer)).then(() => this.newOrder());
          }
        }
      );
    } else {
      this.newOrder();
    }
  }

  newOrder() {
    const date = new Date().toString();
    this.orderStatus.date = date;
    this.order = new Order(this.newLoginId, this.customer.id, date, [this.orderStatus], this.cartService.boughtProducts);
    this.orderArrayService.addOrder(this.order);

    alert('Congratulations! Your order is formed!');
    this.router.navigate(['/products']);
    this.cartService.onClear();
  }

}
