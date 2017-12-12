import { Component, OnInit, ViewEncapsulation, Optional } from '@angular/core';

import { LocalStorageService } from './../../services';

@Component({
  selector: 'app-local-storage',
  templateUrl: './local-storage.component.html',
  styleUrls: ['./local-storage.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LocalStorageComponent implements OnInit {

  value: string;

  constructor( @Optional() public localStorageService: LocalStorageService ) { }

  ngOnInit() {
    this.value = this.localStorageService ? this.localStorageService.getItem('Stored Value') : 'No Service Found';
  }

  update(newValue: string) {
    if (this.localStorageService) {
      this.localStorageService.setItem('Stored Value', newValue);
      this.value = newValue;
    } else { alert('No Service Found'); }
  }

  remove() {
    if (this.localStorageService) {
      this.localStorageService.removeItem('Stored Value');
      this.value = '';
    } else { alert('No Service Found'); }
  }

}
