import { Injectable } from '@angular/core';

import { User } from './../models';

const userList = [
  new User(1, 'Kristina', 'Kristina', 'Kristina', 'Kostyuk', 'ul. Mogilyovskaya, 32-37', false),
  new User(2, 'Boris', 'Boris', 'Boris', 'Vlasov', '', false),
  new User(3, 'Gennadiy', 'Gennadiy', 'Gennadiy', 'Dmitriev', '', false),
  new User(4, 'Admin', 'Admin', 'Admin', 'Admin', '', true)
];

const userListPromise = Promise.resolve(userList);

@Injectable()
export class UserArrayService {
  getUsers(): Promise<User[]> {
    return userListPromise;
  }

  getUser(id: number | string): Promise<User> {
    return this.getUsers()
      .then(users => users.find(user => user.id === +id))
      .catch(() => Promise.reject('Error in getUser method'));
  }

  getUserByLogin(login: string): Promise<User> {
    return this.getUsers()
      .then(users => users.find(user => user.login === login))
      .catch(() => Promise.reject('Error in getUserByLogin method'));
  }

  getNewId(): number {
    return userList[userList.length - 1].id + 1;
  }

  async addUser(user: User) {
    await userList.push(user);
  }

  updateUser(user: User): void {
    let i = -1;

    userList.forEach((item, index) => {
      if (item.id === user.id ) {
        i = index;
        return false;
      }
    });

    if (i > -1) {
      userList.splice(i, 1, user);
    }
  }
}
