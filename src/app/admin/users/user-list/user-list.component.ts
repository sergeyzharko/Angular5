import { Component, OnInit } from '@angular/core';
import { AutoUnsubscribe } from './../../../decorators';
import { ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Subscription } from 'rxjs/Subscription';

import { User } from './../../../models';
import { UserArrayService } from './../../../services';

@Component({
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
@AutoUnsubscribe('subscription')
export class UserListComponent implements OnInit {
  users: Array<User>;
  private editedUser: User;
  errorMessage: string;
  private subscription: Subscription[] = [];

  constructor(
    private userArrayService: UserArrayService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // this.userArrayService.getUsers()
    //   .then(users => this.users = users)
    //   .catch((err) => console.log(err));

    const sub = this.userArrayService.getUsers()
      .subscribe(
        users => this.users = users,
        error => this.errorMessage = <any>error
      );
    this.subscription.push(sub);


    // listen id from UserFormComponent
    // Последний отредактированный
    let id;
    this.route.paramMap.subscribe( params => { id = params.get('id'); });
    if (id) {
      this.route.paramMap
      .switchMap((params: Params) => this.userArrayService.getUser(+params.get('id')))
      .subscribe(
        (user: User) => {
          this.editedUser = Object.assign({}, user);
          console.log(`Last time you edit user ${JSON.stringify(this.editedUser)}`);
        },
        (err) => console.log(err)
      );
    }
  }

  isEdited(user: User) {
    if (this.editedUser) {
      return user.id === this.editedUser.id;
    }
    return false;
  }

  deleteUser(user: User) {
    this.userArrayService.deleteUser(user)
    .subscribe(
      () => this.users = this.users.filter(u => u !== user),
      err => console.log(err)
    );
  }

}
