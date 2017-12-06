import { Injectable } from '@angular/core';

import { Order, Status, OrderStatus } from './../models';

const date = new Date().toString();

const orderList = [
  new Order(
    1, 1, date, [
      { id: 0, date: date, status: Status.A }
    ], [{name: 'Milk', quantity: 4,  price: 0.51}, {name: 'Bread', quantity: 1, price: 0.32}]
  )
];

const orderListPromise = Promise.resolve(orderList);

@Injectable()
export class OrderArrayService {
  getOrders(): Promise<Order[]> {
    return orderListPromise;
  }

  getOrder(id: number | string): Promise<Order> {
    return this.getOrders()
      .then(orders => orders.find(order => order.id === +id))
      .catch(() => Promise.reject('Error in getOrder method'));
  }

  getNewId(): number {
    return orderList[orderList.length - 1].id + 1;
  }

  addOrder(order: Order): void {
    orderList.push(order);
  }

  updateOrder(order: Order): void {
    let i = -1;

    orderList.forEach((item, index) => {
      if (item.id === order.id ) {
        i = index;
        return false;
      }
    });

    if (i > -1) {
      orderList.splice(i, 1, order);
    }
  }

  nextStatus(order: Order) {

    let maxId = 0;
    for (let i = 0; i < order.status.length; i++) {
      if (order.status[i].id > maxId) { maxId = order.status[i].id; }
    }

    const currentStatus = order.status[maxId].status;
    console.log(order.status);

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
}
