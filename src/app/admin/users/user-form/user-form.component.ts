import { Component, OnInit } from '@angular/core';
import { AutoUnsubscribe } from './../../../decorators';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { DialogService } from './../../../services';
import { Subscription } from 'rxjs/Subscription';

import { CanComponentDeactivate } from './../../../guards/can-component-deactivate.interface';
import { User } from './../../../models';
import { UserArrayService } from './../../../services';

@Component({
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
@AutoUnsubscribe()
export class UserFormComponent implements OnInit, CanComponentDeactivate {
  user: User;
  originalUser: User;
  private sub: Subscription[] = [];

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

    // if (user.id) {
    //   this.userArrayService.updateUser(user);
    //   this.router.navigate(['/users', {id: user.id}]);
    // } else {
    //   this.userArrayService.addUser(user);
    //   this.goBack();
    // }
    // this.originalUser = Object.assign({}, this.user);

    const method = user.id ? 'updateUser' : 'addUser';
    const sub = this.userArrayService[method](user)
      .subscribe(
        () => {
          this.originalUser = Object.assign({}, this.user);
          user.id
            // optional parameter: http://localhost:4200/users;id=2
            ? this.router.navigate(['admin/users', { id: user.id }])
            : this.router.navigate(['admin/users']);
        },
        error => console.log(error)
      );
    this.sub.push(sub);

  }

  goBack() {
    this.router.navigate(['../../'], { relativeTo: this.route});
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
