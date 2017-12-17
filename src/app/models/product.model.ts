  export enum Category { A = 'food', B = 'drink', C = 'other' }
  import { Producer } from './producer.model';

  export class Product {
    constructor(
      public id: number = null,
      public name: string = '',
      public description: string = '',
      public price: number = null,
      public quantity: number = null,
      public category: Category = Category.A,
      public isAvailable: boolean = null,
      public ingredients: Array<string> = [],
      public equivalents: Array<string> = [],
      public producerInfo?: boolean,
      public producer?: Producer,
      public bought?: boolean,
      public updateDate?: Date
    ) {
      this.isAvailable = (this.isAvailable === undefined) ? true : this.isAvailable;
      this.producerInfo = false;
      this.bought = (this.bought === undefined) ? true : this.bought;
      this.updateDate = new Date();
    }
  }
