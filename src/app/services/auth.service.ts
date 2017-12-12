import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import './rxjs-extensions';

import { UserArrayService } from '../services/user-array.service';
import { User } from './../models';

@Injectable()
export class AuthService {
  isLoggedIn = false;
  isAdmin = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string;
  currentUser: User;

  constructor(
    public userArrayService: UserArrayService
  ) { }

  async login(user) {
    // return Observable.of(true).delay(1000).do(val => this.isLoggedIn = true);
        const self = this;
        await this.userArrayService.getUserByLogin(user.login).then(
          function(correctUser) {
            if ( correctUser && (correctUser.password === user.password) ) {
              if ( correctUser.isAdmin ) {
                self.isAdmin = true;
                console.log(self.isAdmin);
              }
              self.isLoggedIn = true;
              self.currentUser = correctUser;
              console.log(`Login: ${self.currentUser.login}, isAdmin: ${self.isAdmin}`);
            } else {
              console.log('incorrect login/password');
            }
          }
        );
  }

  logout(): void {
    this.isLoggedIn = false;
    this.isAdmin = false;
    this.currentUser = undefined;
  }
}
