import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import './rxjs-extensions';
import { Subscription } from 'rxjs/Subscription';

import { UserArrayService } from '../services/user-array.service';
import { User } from './../models';

@Injectable()
export class AuthService implements OnInit, OnDestroy {
  users: Array<User>;
  isLoggedIn = false;
  isAdmin = false;
  errorMessage: string;
  private subscription: Subscription[] = [];

  // store the URL so we can redirect after logging in
  redirectUrl: string;
  currentUser: User;

  constructor(
    public userArrayService: UserArrayService,
    public router: Router
  ) { }

  ngOnInit() {
    const sub = this.userArrayService.getUsers()
      .subscribe(
        users => this.users = users,
        error => this.errorMessage = <any>error
      );
    this.subscription.push(sub);
  }

  login(user) {
    let redirect = '/login';

    this.userArrayService.getUsers()
    .subscribe(
      users => {
        this.errorMessage = '';
        // return Observable.of(true).delay(1000).do(val => this.isLoggedIn = true);
        // await this.userArrayService.getUserByLogin(user.login).then(
        const correctUser = users.find( sourceUser => user.login === sourceUser.login);
        if ( correctUser && (correctUser.password === user.password) ) {
          if ( correctUser.isAdmin ) {
            this.isAdmin = true;
            redirect = this.redirectUrl ? this.redirectUrl : '/admin';
          } else {
            redirect = this.redirectUrl ? this.redirectUrl : '/products';
          }
          this.isLoggedIn = true;
          this.currentUser = correctUser;
          console.log(`Login: ${this.currentUser.login}, isAdmin: ${this.isAdmin}`);
          this.router.navigate([redirect]);
        } else if (correctUser) {
          console.log('Incorrect password');
          this.errorMessage = 'Incorrect password';
        } else {
          console.log('Incorrect login');
          this.errorMessage = 'Incorrect login';
        }
        this.redirectUrl = undefined;
      });
  }

  logout(): void {
    this.isLoggedIn = false;
    this.isAdmin = false;
    this.currentUser = undefined;
  }

  ngOnDestroy() {
    this.subscription.forEach(sub => sub.unsubscribe());
    this.redirectUrl = undefined;
  }
}
