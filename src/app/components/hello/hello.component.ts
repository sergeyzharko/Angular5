import { Component } from '@angular/core';

@Component({
    selector: 'hello',
    template: `
      Please enter your name: <input #box
        (keyup.enter)="update(box.value)"
        (blur)="update(box.value)">
      <p>Hello {{value}}!</p>
    `
  })
  export class Hello {
    value = '';
    update(value: string) { this.value = value; }
  }