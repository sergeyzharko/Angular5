import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserArrayService, OrderArrayService } from '../../../services/';

import { Order, User } from './../../../models';

@Component({
  selector: 'order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  @Input() order: Order;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userArrayService: UserArrayService,
    private orderArrayService: OrderArrayService
  ) { }

  user: User = new User(null, '', '', '', '', '', false);

  ngOnInit() {
    this.userArrayService.getUser(this.order.userId).then( currentUser => this.user = currentUser );
  }

  nextStatus() {
    this.orderArrayService.nextStatus(this.order);
    console.log(this.order);
  }
}
