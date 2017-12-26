import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { CartService, AuthService } from './services/';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Shop';

  private sub: Subscription;

  constructor(
    private router: Router,
    private titleService: Title,
    public cartService: CartService,
    public authService: AuthService
  ) { }

  ngOnInit() {
    this.setPageTitles();
    this.authService.checkCredentials();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private setPageTitles() {
    this.sub = this.router.events
      .filter(event => event instanceof NavigationEnd)
      .map(() => this.router.routerState.root)
      .map(route => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      })
      .filter(route => route.outlet === 'primary')
      .switchMap(route => route.data)
      .subscribe(
         data => this.titleService.setTitle(data['title'])
      );
  }

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

  setColumn(block) {
    const flag = this.cartService.isDisplayed;
    let classes;
    if ( block === 'main' ) {
      classes = {
        'col-md-8': flag,
        'col-md-10': !flag
      };
    } else {
      classes = {
        'col-md-4': flag,
        'col-md-2': !flag
      };
    }
    return classes;
  }

}
