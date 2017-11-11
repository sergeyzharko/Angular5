import { Component, OnInit } from '@angular/core';

enum Category { A = 'food', B = 'drink', C = 'other' };

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class productComponent implements OnInit {
  
  name: string;
  description: string;
  price: number;
  category: Category;
  isAvailable: boolean;
  ingredients: Array<string>;
  equivalents: Array<string>;

  constructor(
  ) { }

  ngOnInit() {
    this.name = `Pizza`;
    this.description = `This is my first pizza`;
    this.price = 10;
    this.category = Category.A;
    this.isAvailable = true;
    this.ingredients = ['flour', 'water', 'tomatoes', 'sausage'];
    this.equivalents = ['hot dog', 'hamburger'];
  }

  onBuy() {
      console.log(`Item bought`);
  }

}
