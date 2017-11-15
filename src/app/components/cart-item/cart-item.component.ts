import { Component, EventEmitter, Input, Output, HostBinding, HostListener } from '@angular/core';

import { Item } from './cart-item.model';

@Component({
  selector: 'cart-item',
  templateUrl: './cart-item.component.html'
})
export class CartItemComponent {
    @Input() item: Item;
    @Output() remove: EventEmitter<Item> = new EventEmitter<Item>();
    @Output() increment: EventEmitter<Item> = new EventEmitter<Item>();
    @Output() decrement: EventEmitter<Item> = new EventEmitter<Item>();

    @HostBinding('class') class = 'Item';

    constructor() {}

    onRemove() {
      console.log(`Item removed`);
      this.remove.emit(this.item);
    }

    onIncrement() {
      console.log(`Item incremented`);
      this.increment.emit(this.item);
    }

    onDecrement() {
      console.log(`Item decremented`);
      this.decrement.emit(this.item);
    }

}