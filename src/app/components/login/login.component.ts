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
    this.authService.login(this.user);

  }

  logout() {
    this.authService.logout();
    this.setMessage();
  }

  private setMessage() {
    this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
  }

}
