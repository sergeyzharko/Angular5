import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import './rxjs-extensions';
import { UsersAPI } from '../services/users.config';

import { User } from './../models';

// const userList = [
//   new User(1, 'Kristina', 'Kristina', 'Kristina', 'Kostyuk', 'ul. Mogilyovskaya, 32-37', false),
//   new User(2, 'Boris', 'Boris', 'Boris', 'Vlasov', '', false),
//   new User(3, 'Gennadiy', 'Gennadiy', 'Gennadiy', 'Dmitriev', '', false),
//   new User(4, 'Admin', 'Admin', 'Admin', 'Admin', '', true)
// ];

// const userListPromise = Promise.resolve(userList);

@Injectable()
export class UserArrayService {

  errorMessage: string;

  constructor(
    private http: HttpClient,
    @Inject(UsersAPI) private usersUrl: string
  ) {}

  getUsers() {
    // return userListPromise;

    return this.http.get(this.usersUrl)
      .map( this.handleData )
      .catch( this.handleError );

  }

  getUser(id: number): Observable<User> {
    // return this.getUsers()
    //   .then(users => users.find(user => user.id === +id))
    //   .catch(() => Promise.reject('Error in getUser method'));
    return this.http.get(`${this.usersUrl}/${id}`)
      .map( this.handleData )
      .catch(this.handleError);
  }

  // getUserByLogin(login: string): Observable<User> {
  //   // return this.getUsers()
  //   //   .then(users => users.find(user => user.login === login))
  //   //   .catch(() => Promise.reject('Error in getUserByLogin method'));
  // }

  getNewId(): number {
    let newId;
    const sub = this.getUsers()
    .subscribe(
      users => newId = users[users.length - 1].id + 1,
      error => this.errorMessage = <any>error
    );
    return newId;

    // return userList[userList.length - 1].id + 1;
  }

  updateUser(user: User): Observable<User> {
    const url = `${this.usersUrl}/${user.id}`,
       body = JSON.stringify(user),
       options = {
         headers: new HttpHeaders({ 'Content-Type': 'application/json' })
       };

    return this.http.put(url, body, options)
           .map( this.handleData )
           .catch(this.handleError);
  }

  addUser(user: User) {
    // await userList.push(user);

    const url = this.usersUrl,
    body = JSON.stringify(user),
    options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post(url, body, options)
        .map( this.handleData )
        .catch( this.handleError );
  }

  // updateUser(user: User): void {
  //   let i = -1;

  //   userList.forEach((item, index) => {
  //     if (item.id === user.id ) {
  //       i = index;
  //       return false;
  //     }
  //   });

  //   if (i > -1) {
  //     userList.splice(i, 1, user);
  //   }
  // }

  deleteUser(user: User): Observable<User> {
    const url = `${this.usersUrl}/${user.id}`;

    return this.http.delete(url)
      .map( this.handleData )
      .catch(this.handleError);
  }

  private handleData(response: HttpResponse<User>) {
    const body = response;
    return body || {};
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage: string;

    // A client-side or network error occurred.
    if (err.error instanceof Error) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}, body was: ${err.error}`;
    }

    console.error(errorMessage);
    return Observable.throw(errorMessage);
  }

}
