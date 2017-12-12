import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Router, Route, ActivatedRouteSnapshot,
  RouterStateSnapshot, NavigationExtras } from '@angular/router';
import { AuthService } from './../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(
      private authService: AuthService,
      private router: Router
  ) {}

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): boolean {
    // console.log('CanActivateGuard is called');
    const url: string = state.url;
    return this.checkLogin(url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // console.log('canActivateChild Guard is called');
    const url: string = state.url;
    return this.checkLogin(url);
  }


  private checkLogin(url: string): boolean {
    if (this.authService.isLoggedIn && this.authService.isAdmin) { return true; }

    // Store the attempted URL for redirecting
    this.authService.redirectUrl = url;

    // Navigate to the login page
    this.router.navigate(['/login']);
    return false;
  }

  canLoad(route: Route): boolean {
    const url = `/${route.path}`;
    return this.checkLogin(url);
  }

}
