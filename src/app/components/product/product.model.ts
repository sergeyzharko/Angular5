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
      public bought: boolean
    ) {
      this.isAvailable = isAvailable || true;
      this.bought = bought || false;
    }
  }  