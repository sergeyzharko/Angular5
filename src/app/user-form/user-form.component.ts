import { Component, OnInit, OnDestroy } from '@angular/core';
import { AutoUnsubscribe } from './../decorators';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { DialogService } from './../services';
import { Subscription } from 'rxjs/Subscription';

import { CanComponentDeactivate } from './../guards/can-component-deactivate.interface';
import { User } from './../models';
import { UserArrayService, AuthService } from './../services';

@Component({
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
@AutoUnsubscribe()
export class UserFormComponent implements OnInit, OnDestroy, CanComponentDeactivate {
  user: User;
  originalUser: User;
  private subscription: Subscription[] = [];
  admin = false;
  errorMessage: string;
  userForm: FormGroup;

  constructor(
    private userArrayService: UserArrayService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.user = new User();

    this.admin = this.router.url.includes('admin') ? true : false;

    if (this.admin) {
      // UserResolveGuard
      this.route.data.subscribe(data => {
        this.user = Object.assign(this.user, data.user);
        this.originalUser = Object.assign(this.user, data.user);
      });
    } else if (this.authService.isLoggedIn) {
      this.user = this.authService.currentUser;
    }

    this.createForm();
    this.setFormValues(this.user);

  }

  saveUser() {
    console.log(this.userForm);
    console.log(`Saved: ${JSON.stringify(this.userForm.value)}`);
    Object.assign(this.user, this.userForm.value);
    this.user.id ? this.update() : this.register();
  }

  register() {
    this.errorMessage = '';
    const sub = this.userArrayService.getUsers().subscribe(
      users => {
        const correctUser = users.find( sourceUser => this.user.login === sourceUser.login);
        if (correctUser) { this.errorMessage = 'This login is already taken'; } else {
          const sub1 = this.userArrayService.addUser(this.user)
          .subscribe(
            () => {
              if (this.admin) { this.navigate(); } else { this.authService.login(this.user, false); }
            },
            error => console.log(error)
          );
          this.subscription.push(sub1);
        }
      });
    this.subscription.push(sub);
  }

  update() {
    const sub2 = this.userArrayService.updateUser(this.user).subscribe(
      () => {
        this.subscription.push(sub2);
        this.navigate();
      }
    );
  }

  private createForm() {
    this.userForm = new FormGroup({
      id: new FormControl(),
      login: new FormControl(),
      password: new FormControl(),
      repeatedPassword: new FormControl(),
      firstName: new FormControl(),
      lastName: new FormControl(),
      email: new FormControl(),
      phone: new FormControl(),
      address: new FormControl(),
      isAdmin: new FormControl(false)
    });
  }

  private setFormValues(user) {
    this.userForm.setValue({
      id: user.id,
      login: user.login,
      password: user.password,
      repeatedPassword: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone || '',
      address: user.address || '',
      isAdmin: user.isAdmin
    });
  }

  navigate() {
    if (this.admin) {
      this.originalUser = Object.assign({}, this.user);
      this.user.id
        // optional parameter: http://localhost:4200/users;id=2
        ? this.router.navigate(['admin/users', { id: this.user.id }])
        : this.router.navigate(['admin/users']);
    } else {
      this.router.navigate(['products']);
    }
  }

  goBack() {
    let path;
    this.user.id ? path = '../../' : path = '../' ;
    this.router.navigate([path], { relativeTo: this.route});
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    const flags = [];
    for (const key in this.originalUser) {
      if (this.originalUser[key] === this.user[key]) {
        flags.push(true);
      } else {
        flags.push(false);
      }
    }

    if (flags.every(el => el)) {
      return true;
    }

    return this.dialogService.confirm('Discard changes?');
  }

  ngOnDestroy() {
    this.subscription.forEach(sub => sub.unsubscribe());
  }

}
