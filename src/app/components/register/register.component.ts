import { Component, OnInit, ViewEncapsulation, ViewChild, OnDestroy } from '@angular/core';

import { User } from '../../models/';
import { UserArrayService, AuthService } from '../../services/';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  errorMessage: string;
  private subscription: Subscription[] = [];
  isLoggedIn: boolean;
  repeatedPassword: string;

  constructor(
    public userArrayService: UserArrayService,
    public authService: AuthService,
    public router: Router
  ) {}

  newUserId = this.userArrayService.getNewId();

  customer = new User(this.newUserId, '', '', '', '', '', false);

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn;

    if ( this.isLoggedIn ) {
      this.customer = this.authService.currentUser;
    } else {
      this.customer = new User(this.newUserId, '', '', '', '', '', false);
    }
  }

  register() {
    this.errorMessage = '';
    const sub = this.userArrayService.getUsers().subscribe(
      users => {
        const correctUser = users.find( sourceUser => this.customer.login === sourceUser.login);
        if (correctUser) { this.errorMessage = 'This login is already taken'; } else {
          const sub1 = this.userArrayService.addUser(this.customer)
          .subscribe(
            () => {
              this.authService.login(this.customer);
              // this.authService.redirectUrl = '/products';
            },
            error => console.log(error)
          );
          this.subscription.push(sub1);
        }
      });
    this.subscription.push(sub);
  }

  update() {
    const sub2 = this.userArrayService.updateUser(this.customer).subscribe(
      () => {
        this.subscription.push(sub2);
        this.router.navigate(['/products']);
      }
    );
  }

  ngOnDestroy() {
    this.subscription.forEach(sub => sub.unsubscribe());
  }

}
