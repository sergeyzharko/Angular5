import { Directive, forwardRef, OnInit, OnDestroy } from '@angular/core';
import { NG_ASYNC_VALIDATORS, Validator, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/first';
import { Subscription } from 'rxjs/Subscription';

import { UserArrayService } from './../services';
import { User } from './../models';

@Directive({
  selector: '[asyncLoginValidator][formControlName], [asyncLoginValidator][ngModel]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => AsyncLoginValidatorDirective), multi: true
    }
  ]
})
export default class AsyncLoginValidatorDirective implements OnInit, OnDestroy, Validator {

    private subscription: Subscription[] = [];
    users: Array<User> = [];

    constructor(
        private userArrayService: UserArrayService
        ) { }

    ngOnInit(): void {
        console.log('Works');
        const sub = this.userArrayService.getUsers().subscribe(
            users => { this.users = users; });
            this.subscription.push(sub);
    }

    ngOnDestroy() {
        this.subscription.forEach(sub => sub.unsubscribe());
    }

    validate(c: AbstractControl): Observable < {[key: string]: any}> {
        return this.validateLogin(c.value).debounceTime(1000).distinctUntilChanged().first();
    }

    private validateLogin(newLogin: string) {

        const correctUser = this.users.find( sourceUser => newLogin === sourceUser.login);

        return new Observable(observer => {
        if (correctUser) {
            observer.next({asyncLoginInvalid: true});
        } else {
            observer.next(null);
        }
        });
    }
}
