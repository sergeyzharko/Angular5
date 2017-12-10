import { Component, EventEmitter, Input, Output, HostBinding, HostListener, Renderer2, ElementRef, OnDestroy } from '@angular/core';

import { Item } from '../../models/';

@Component({
  selector: 'tr',
  templateUrl: './cart-item.component.html',
  styleUrls: ['../cart/cart.component.css']
})
export class CartItemComponent implements OnDestroy {
    @Input() item: Item;
    @Output() remove: EventEmitter<Item> = new EventEmitter<Item>();
    @Output() increment: EventEmitter<Item> = new EventEmitter<Item>();
    @Output() decrement: EventEmitter<Item> = new EventEmitter<Item>();

    @HostBinding('class') class = 'Item';

    @HostListener('mouseenter') onMouseEnter() {
        this.setBackgroundColor('blue');
        console.log(this);
        console.log('enter');
    }

    @HostListener('mouseleave') onMouseLeave() {
        this.setBackgroundColor('green');
    }

    constructor(private element: ElementRef, private renderer: Renderer2) {}

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

    private setBackgroundColor(val: string) {
      this.renderer.setStyle(this.element.nativeElement, 'background-color', val);
    }

    ngOnDestroy() {
      console.log(`CartItem was destroyed`);
    }

}
