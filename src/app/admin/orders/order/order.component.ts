import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserArrayService, OrderArrayService } from '../../../services/';
import { Subscription } from 'rxjs/Subscription';

import { Order, User } from './../../../models';

@Component({
  selector: 'order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit, OnDestroy {
  @Input() order: Order;
  @Output() onDelete = new EventEmitter<Order>();
  errorMessage: string;
  private subscription: Subscription[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userArrayService: UserArrayService,
    private orderArrayService: OrderArrayService
  ) { }

  user: User = new User(null);

  ngOnInit() {
    const sub = this.userArrayService.getUser(this.order.userId)
    .subscribe(
      currentUser => this.user = currentUser
    );
    this.subscription.push(sub);
  }

  nextStatus() {
    this.orderArrayService.nextStatus(this.order);
  }

  deleteOrder() {
    this.onDelete.emit(this.order);
  }

  ngOnDestroy() {
    this.subscription.forEach(sub => sub.unsubscribe());
  }

}
