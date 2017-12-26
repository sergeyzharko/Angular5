import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ProductComponent } from './product.component';
import { Product, Category } from '../../models/';

describe('ProductComponent', () => {
  let component: ProductComponent,
    fixture: ComponentFixture<ProductComponent>,
    productDescription: DebugElement,
    buyButton: DebugElement;
  const expectedProduct: Product = {
    'id': 1,
    'name': 'Bread',
    'description': 'This is my first bread',
    'price': 0.31,
    'quantity': 12,
    'category': Category.A,
    'isAvailable': true,
    'ingredients': [
      'flour',
      'water'
    ],
    'equivalents': [
      'bun',
      'sandwich'
    ],
    'producerInfo': true,
    'producer': {
      'name': 'Hlebozavod №2',
      'city': 'Minsk',
      'country': 'Belarus'
    },
    'bought': false,
    'updateDate': new Date()
  };

  // асинхронный beforeEach
  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [ ProductComponent ]
      })
      // Компилируем темплейт
      .compileComponents();
  }));

  // Синхронный beforeEach
  beforeEach(() => {
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;

    // Ищем user элемент по селектору
    productDescription = fixture.debugElement.query(By.css('.list-group-item-warning:first-child'));

    // Предположим, что мы получили пользователя на вход
    component.product = expectedProduct;

    // Запускаем обнаружение изменений для первоначальной привязки данных
    fixture.detectChanges();
  });


  // Тест проверяет, что пользователь передается в шаблон
  // через property binding
  // В шаблоне используется пайп, тест должен проверить результат
  // в нужном регистре
  it('should display description', () => {
    const expectedDescription = expectedProduct.description;
    expect(productDescription.nativeElement.textContent).toContain(expectedProduct.description);
  });

  it('should raise selected event when clicked', () => {
    let selectedProduct: Product;
    component.buy.subscribe((product: Product) => selectedProduct = product);

    // DebugElement.triggerEventHandler может сгенерить любое связанное
    // с данными событие по имени события.
    // Второй параметр - это объект события, переданный обработчику.
    // В этом примере тест запускает событие «click»
    // с наловым объектом события.
    buyButton = fixture.debugElement.query(By.css('button:first-of-type'));
    buyButton.triggerEventHandler('click', null);
    expect(selectedProduct).toBe(expectedProduct);
  });

});
