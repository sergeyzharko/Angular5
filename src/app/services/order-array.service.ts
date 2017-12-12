import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import './rxjs-extensions';
import { OrdersAPI } from '../services/orders.config';

import { Order, Status, OrderStatus } from './../models';

// const date = new Date().toString();

// const orderList = [
//   new Order(
//     1, 1, date, [
//       { id: 0, date: date, status: Status.A }
//     ], [{name: 'Milk', quantity: 4,  price: 0.51}, {name: 'Bread', quantity: 1, price: 0.32}]
//   )
// ];

// const orderListPromise = Promise.resolve(orderList);

@Injectable()
export class OrderArrayService {

  errorMessage: string;

  constructor(
    private http: HttpClient,
    @Inject(OrdersAPI) private ordersUrl: string
  ) {}

  getOrders(): Observable<Order[]> {
    return this.http.get(this.ordersUrl)
      .map( this.handleData )
      .catch( this.handleError );
  }

  getOrder(id: number): Observable<Order> {
    return this.http.get(`${this.ordersUrl}/${id}`)
      .map( this.handleData )
      .catch(this.handleError);
  }

  getNewId(): number {
    let newId;
    const sub = this.getOrders()
    .subscribe(
      orders => newId = orders[orders.length - 1].id + 1,
      error => this.errorMessage = <any>error
    );
    return newId;
  }

  addOrder(order: Order): Observable<Order> {
    const url = this.ordersUrl,
    body = JSON.stringify(order),
    options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post(url, body, options)
        .map( this.handleData )
        .catch( this.handleError );
  }

  updateOrder(order: Order): Observable<Order> {
    const url = `${this.ordersUrl}/${order.id}`,
    body = JSON.stringify(order),
    options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.put(url, body, options)
      .map( this.handleData )
      .catch(this.handleError);
  }

  nextStatus(order: Order) {

    let maxId = 0;
    let element = 0;

    for (let i = 0; i < order.status.length; i++) {
      if (order.status[i].id > maxId) { maxId = order.status[i].id; element = i; }
    }

    const currentStatus = order.status[element].status;

    if (currentStatus === Status.D) { alert('Max status'); return; }

    let StatusTitle;

    switch (currentStatus) {
      case Status.A: StatusTitle = Status.B; break;
      case Status.B: StatusTitle = Status.C; break;
      case Status.C: StatusTitle = Status.D; break;
    }

    const newStatus = new OrderStatus(maxId + 1, new Date().toString(), StatusTitle);
    order.status.push(newStatus);
    this.updateOrder(order);

  }

  deleteOrder(order: Order): Observable<Order> {
    const url = `${this.ordersUrl}/${order.id}`;

    return this.http.delete(url)
      .map( this.handleData )
      .catch(this.handleError);
  }

  private handleData(response: HttpResponse<Order>) {
    const body = response;
    return body || {};
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage: string;

    // A client-side or network error occurred.
    if (err.error instanceof Error) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}, body was: ${err.error}`;
    }

    console.error(errorMessage);
    return Observable.throw(errorMessage);
  }

}
