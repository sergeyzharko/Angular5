import { InjectionToken } from '@angular/core';
export const OrdersAPI = new InjectionToken<string>('UsersAPI');
export const ordersBaseUrl = 'http://localhost:3000/ordersShop';
