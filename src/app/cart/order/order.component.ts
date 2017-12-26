import { Component, OnInit, ViewEncapsulation, ViewChild, OnDestroy } from '@angular/core';

import { Order, User, Status, OrderStatus } from '../../models/';
import { CartService, UserArrayService, AuthService, OrderArrayService } from '../../services/';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit, OnDestroy {
  values;
  private subscription: Subscription[] = [];

  constructor(
    public cartService: CartService,
    public userArrayService: UserArrayService,
    public orderArrayService: OrderArrayService,
    public authService: AuthService,
    public router: Router
  ) {}

  newUserId = this.userArrayService.getNewId();
  newLoginId = this.orderArrayService.getNewId();

  customer = new User(this.newUserId);
  isLoggedIn: boolean;
  order: Order;
  orderStatus = new OrderStatus(1, '', Status.A);

  ngOnInit() {
    this.values = this.cartService.values;
    this.isLoggedIn = this.authService.isLoggedIn;

    if ( this.isLoggedIn ) {
      this.customer = this.authService.currentUser;
    }
  }

  buy() {
    const date = new Date().toString();
    this.orderStatus.date = date;
    this.order = new Order(this.newLoginId, this.customer.id, date, [this.orderStatus], this.cartService.boughtProducts);
    this.orderArrayService.addOrder(this.order).subscribe(
      () => {
        alert('Congratulations! Your order is formed!');
        this.router.navigate(['/products']);
        this.cartService.onClear();
      }
    );
  }

  login() {
    this.authService.redirectUrl = '/cart/order';
    this.router.navigate(['/login']);
  }

  register() {
    this.authService.redirectUrl = '/cart/order';
    this.router.navigate(['/register']);
  }

  ngOnDestroy() {
    this.subscription.forEach(sub => sub.unsubscribe());
  }

}
