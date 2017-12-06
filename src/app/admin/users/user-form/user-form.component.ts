import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { DialogService } from './../../../services';

import { CanComponentDeactivate } from './../../../guards/can-component-deactivate.interface';
import { User } from './../../../models';
import { UserArrayService } from './../../../services';

@Component({
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit, OnDestroy, CanComponentDeactivate {
  user: User;
  originalUser: User;

  constructor(
    private userArrayService: UserArrayService,
    private route: ActivatedRoute,
    private router: Router,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.user = new User(1, '', '', '', '', '', false);

    this.route.data.subscribe(data => {
      this.user = Object.assign({}, data.user);
      this.originalUser = Object.assign({}, data.user);
    });
  }

  ngOnDestroy(): void {
  }

  saveUser() {
    const user = new User(
      this.user.id,
      this.user.password,
      this.user.login,
      this.user.firstName,
      this.user.lastName,
      this.user.address,
      this.user.isAdmin
    );

    if (user.id) {
      this.userArrayService.updateUser(user);
      this.router.navigate(['/users', {id: user.id}]);
    } else {
      this.userArrayService.addUser(user);
      this.goBack();
    }
    this.originalUser = Object.assign({}, this.user);
  }

  goBack() {
    this.router.navigate(['./../../'], { relativeTo: this.route});
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

  
}
