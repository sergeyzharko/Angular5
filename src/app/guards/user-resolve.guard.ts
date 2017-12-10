import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { User } from './../models';
import { UserArrayService } from './../services';

@Injectable()
export class UserResolveGuard implements Resolve<User> {

  constructor(
    private userArrayService: UserArrayService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<User> | null {
    const id = +route.paramMap.get('id');

    // return this.userArrayService.getUser(id).then(user => {
    //   if (user) {
    //     return user;
    //   } else { // id not found
    //     this.router.navigate(['/users']);
    //     return null;
    //   }
    // });

    if (id) {
      return this.userArrayService.getUser(id)
        .catch(() => {
          this.router.navigate(['/users']);
          return Observable.of(null);
        });
    } else {
      return Observable.of(new User(null, '', '', '', '', '', false));
    }


  }
}
