import { Component } from '@angular/core';

@Component({
    selector: 'app-hello',
    template: `<div style="margin: 40px 0px 0px 20px;"><label>
      Please enter your name:</label><div class="input-group"> <input #box
        (keyup.enter)="update(box.value)"
        (blur)="update(box.value)">
      <p>Hello {{value}}!</p></div>
    `
  })
  export class HelloComponent {
    value = '';
    update(value: string) { this.value = value; }
  }