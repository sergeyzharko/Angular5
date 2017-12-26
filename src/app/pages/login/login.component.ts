import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from './../../services/auth.service';

import { User } from '../../models/';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  message: string;
  rememberFlag = true;

  user = new User();

  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  ngOnInit() {
  }

  login() {
    console.log(this.user);
    console.log(this.rememberFlag);
    this.authService.login(this.user, this.rememberFlag);
  }

}
