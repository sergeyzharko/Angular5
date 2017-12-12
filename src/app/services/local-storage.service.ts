import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {

  constructor( ) { }

  setItem(item: string, value: string ): void {
    localStorage.setItem(item, value);
  }

  getItem(item: string): string {
    return localStorage.getItem(item);
  }

  removeItem(item: string): void {
    localStorage.removeItem(item);
  }

}
