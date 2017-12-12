import { Component, OnInit, ViewEncapsulation, Optional } from '@angular/core';

import { ConstantsService } from './../../services';

@Component({
  selector: 'app-constants',
  templateUrl: './constants.component.html',
  styleUrls: ['./constants.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ConstantsComponent implements OnInit {

  constructor( @Optional() public constantsService: ConstantsService ) { }

  constants;

  ngOnInit() {
    this.constants = this.constantsService ? this.constantsService.getData() : 'No Service Found';
  }

}
