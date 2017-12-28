import { TestBed, inject } from '@angular/core/testing';
import { HttpEvent, HttpEventType } from '@angular/common/http';

// HttpClientTestingModule используется для упрощения написания юнит тестов для HTTP запросов
// Используем также HttpTestingController
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { UserArrayService } from './user-array.service';
import { UsersAPI, usersBaseUrl } from '../services/users.config';

describe('HttpClientService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserArrayService, {provide: UsersAPI, useValue: usersBaseUrl}]
    });
  });

  it('should get users',
    inject([HttpTestingController, UserArrayService],
      (httpMock: HttpTestingController, dataService: UserArrayService) => {

      // Вспомогательный объект
      const mockUsers = [
        {
          id: 1,
          login: 'Kristina',
          password: 'Kristina',
          firstName: 'Kristina1',
          lastName: 'Kostyuk',
          notification: 'Email',
          email: 'kristina.evzrezova@gmail.com',
          phones: [
            {
              number: '+375296358333',
              type: 'Home'
            },
            {
              number: '+375296111111',
              type: 'Work'
            }
          ],
          street1: 'ul. Mogilyovskaya',
          street2: '32-37',
          isAdmin: false,
          country: 'Belarus',
          city: 'Minsk',
          zip: '220007'
        },
        {
          id: 4,
          login: 'Admin',
          password: 'Admin',
          firstName: 'Admin',
          lastName: 'Admin',
          email: 'admin@admin.com',
          phones: [
            {
              number: '+375296111111',
              type: 'Work'
            }
          ],
          street1: 'ul. Voronyanskogo, d. 3',
          isAdmin: true,
        }
      ];

      dataService.getUsers().subscribe((event: HttpEvent<any>) => {
        switch (event.type) {
          // Если HttpEventType === Response, проверяем тело запроса
          case HttpEventType.Response:
            expect(event.body).toEqual(mockUsers);
        }
      });

      // В этот момент запрос в ожидании и никакой ответ не будет отправлен
      // Следующий шаг - это проверить, что запрос выполнен
      // Используем HttpTestingController
      // Если запросов не было или было больше, чем один, то получим ошибку
      // Можно также использовать метод expectNone, если запросов не ожидается
      const mockReq = httpMock.expectOne('users');

      // Проверим, что запрос не был отменен
      // и тип ответа === json
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      expect(mockReq.request.method).toEqual('GET');

      // Вызываем flush и передаем объект с пользователями
      // Этот метод завершает запрос и возвращает данные, которые мы передали
      mockReq.flush(mockUsers);
  }));

  it('should get one user',
  inject([HttpTestingController, UserArrayService],
    (httpMock: HttpTestingController, dataService: UserArrayService) => {

    // Вспомогательный объект
    const mockUsers = [
      {
        id: 1,
        login: 'Kristina',
        password: 'Kristina',
        firstName: 'Kristina1',
        lastName: 'Kostyuk',
        notification: 'Email',
        email: 'kristina.evzrezova@gmail.com',
        phones: [
          {
            number: '+375296358333',
            type: 'Home'
          },
          {
            number: '+375296111111',
            type: 'Work'
          }
        ],
        street1: 'ul. Mogilyovskaya',
        street2: '32-37',
        isAdmin: false,
        country: 'Belarus',
        city: 'Minsk',
        zip: '220007'
      },
      {
        id: 4,
        login: 'Admin',
        password: 'Admin',
        firstName: 'Admin',
        lastName: 'Admin',
        email: 'admin@admin.com',
        phones: [
          {
            number: '+375296111111',
            type: 'Work'
          }
        ],
        street1: 'ul. Voronyanskogo, d. 3',
        isAdmin: true,
      }
    ];

    // dataService.getUser(4).subscribe(user => {
    //         expect(user).toBe(mockUsers[1]);
    //     });

    //   const mockReq = httpMock.expectOne('users');
    //   expect(mockReq.request.method).toEqual('GET');

}));


it('should add and get test user',
inject([HttpTestingController, UserArrayService],
  (httpMock: HttpTestingController, dataService: UserArrayService) => {
    enum Notification { A = 'Email', B = 'Phone' }
    const newUser = {
        id: 10,
        login: 'Ivan',
        password: 'Ivan',
        firstName: 'Ivan',
        lastName: 'Ivanov',
        notification: Notification.A,
        email: 'test@test.com',
        street1: '',
        isAdmin: false,
        country: 'Belarus',
        city: 'Minsk',
        zip: '220007',
      };
    dataService.addUser(newUser).subscribe(() => {
        dataService.getUser(10).subscribe(user => {
            expect(user).toBe(newUser);
        } );
    });

    const mockReq = httpMock.expectOne('users');
    expect(mockReq.request.method).toEqual('POST');
}));

  afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
    // В конце вызываем метод verify() HttpTestingController
    // чтобы убедиться, что никакие запросы больше не исходят
    httpMock.verify();
  }));

});
