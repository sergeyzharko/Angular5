import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { HighlightDirective } from './highlight.directive';

// Искусственный компонент, который демонстрирует
// все способы использования директивы
@Component({
  template: `
  <h2 highlight="4px double black">Something Border</h2>
  <div class="host"><h2 highlight>The Default</h2></div>
  <h2>No Highlight</h2>`
})
class TestComponent { }

describe('HighlightDirective', () => {

  let fixture: ComponentFixture<TestComponent>,
      des: DebugElement[],  // три элемента с директивой
      bareH2: DebugElement; // <h2> без директивы

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [HighlightDirective, TestComponent]
    })
      .createComponent(TestComponent);

    // первоначальная инициализация
    fixture.detectChanges();

    // Находим все элементы с директивой
    des = fixture.debugElement.queryAll(By.directive(HighlightDirective));

    fixture.debugElement.queryAll(By.css('.host'))[0].nativeElement.click();
    // Находим h2 без директивы
    bareH2 = fixture.debugElement.query(By.css('h2:not([highlight])'));
  });


  it('should have three highlighted elements', () => {
    expect(des.length).toBe(2);
  });

  it('can inject `HighlightDirective` in 1st <h2>', () => {
    const dir = des[0].injector.get(HighlightDirective);
    expect(dir).toBeTruthy();
  });

  it('cannot inject `HighlightDirective` in 3rd <h2>', () => {
    const dir = bareH2.injector.get(HighlightDirective, null);
    expect(dir).toBe(null);
  });

  // DebugElement.providerTokens должен содержать директиву
  it('should have `HighlightDirective` in 1st <h2> providerTokens', () => {
    expect(des[0].providerTokens).toContain(HighlightDirective);
  });

  it('should not have `HighlightDirective` in 3rd <h2> providerTokens', () => {
    expect(bareH2.providerTokens).not.toContain(HighlightDirective);
  });
});
