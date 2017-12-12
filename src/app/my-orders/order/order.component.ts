import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderArrayService } from '../../services/';

import { Order } from './../../models';

@Component({
  selector: 'order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  @Input() order: Order;

  constructor(
    private orderArrayService: OrderArrayService
  ) { }

  ngOnInit() {
  }
}
