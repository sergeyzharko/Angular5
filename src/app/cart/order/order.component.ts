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
  errorMessage: string;
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
      const sub = this.userArrayService.getUsers().subscribe(
        users => {
          const correctUser = users.find( sourceUser => this.customer.login === sourceUser.login);
          if (correctUser && this.customer.login === correctUser.login) { alert('This login is already taken'); } else {
            const sub1 = this.userArrayService.addUser(this.customer)
            .subscribe(
              () => {
                this.authService.login(this.customer);
                this.newOrder();
              },
              error => console.log(error)
            );
            this.subscription.push(sub1);
          }
        });
        this.subscription.push(sub);

      // this.userArrayService.getUser(this.customer.id).then(
      //   (saveCustomer) => {
      //     if (saveCustomer && this.customer.login === saveCustomer.login) { alert('This login is already taken'); } else {
      //       this.userArrayService.addUser(this.customer).then(() => this.authService.login(this.customer)).then(() => this.newOrder());
      //     }
      //   }
      // );
    } else {
      this.newOrder();
    }
  }

  newOrder() {
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
