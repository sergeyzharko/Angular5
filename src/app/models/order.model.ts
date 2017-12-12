import { Item } from './cart-item.model';
import { OrderStatus } from './order-status.model';

export class Order {
    constructor(
        public id: number,
        public userId: number,
        public createDate: string,
        public status: Array<OrderStatus>,
        public boughtProducts: Array<Item>
    ) {}
}
