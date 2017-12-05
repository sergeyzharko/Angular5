import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { CartService } from './services/';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Shop';

  constructor(
    private router: Router,
    public cartService: CartService
  ) { }

  onActivate($event) {
 //   console.log('Activated Component', $event);
  }

  onDeactivate($event) {
 //   console.log('Deactivated Component', $event);
  }

  displayCart(): void {
    this.router.navigate([{ outlets: { popup: ['cart'] } }]);
    this.cartService.isDisplayed = true;
  }

  setClasses(coef) {
    const flag = !this.cartService.boughtProducts.length;
    let value;
    if ( Number(coef) === 1 ) { value = flag; } else { value = !flag; }
    const classes = {
      empty: value
    };

    return classes;
  }


}
