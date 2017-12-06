import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';

import { User } from '../../models/';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  message: string;

  user = new User(1, '', '', '', '', '', false);

  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  ngOnInit() {
    this.setMessage();
  }

  login() {
    this.message = 'Trying to log in ...';
    this.setMessage();
    this.authService.login(this.user).then(() => {
      if (this.authService.isLoggedIn && this.authService.isAdmin) {
        // Get the redirect URL from our auth service
        // If no redirect has been set, use the default
        console.log('Login: User');
        const redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/admin';
        // Redirect the user
        this.router.navigate([redirect]);
      } else if (this.authService.isLoggedIn) {
        console.log('2');
        const redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/products';
        this.router.navigate([redirect]);
      }
      console.log('Login: Admin');
    }
    );


  }

  logout() {
    this.authService.logout();
    this.setMessage();
  }

  private setMessage() {
    this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
  }

}
