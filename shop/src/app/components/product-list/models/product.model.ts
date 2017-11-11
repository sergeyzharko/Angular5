/**
  * Task Model
  */

  export enum Category { A = 'food', B = 'drink', C = 'other' };

  export class Product {
    constructor(
      public name: string,
      public description: string,
      public price: number,
      public category: Category,
      public isAvailable: boolean,
      public ingredients: Array<string>,
      public equivalents: Array<string>,
    ) {
      this.isAvailable = isAvailable || true;
    }
  }  