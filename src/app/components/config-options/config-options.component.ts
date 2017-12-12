import { Component, OnInit, ViewEncapsulation, Optional } from '@angular/core';

import { ConfigOptionsService } from './../../services';
import { Options } from './../../models';

@Component({
  selector: 'app-config-options',
  templateUrl: './config-options.component.html',
  styleUrls: ['./config-options.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ConfigOptionsComponent implements OnInit {

  constructor( @Optional() public configOptionsService: ConfigOptionsService ) { }

  options: Options = {
    login: '',
    id: '',
    email: ''
  };

  ngOnInit() {
    if (this.configOptionsService) {
      this.configOptionsService.setOptions({login: 'Kristina', id: '1', email: 'krystsina_kastsiuk@epam.com'});

      const newOptions = this.configOptionsService.getOptions();

      this.options.login = newOptions.login;
      this.options.id = newOptions.id;
      this.options.email = newOptions.email;
    } else {
      this.options.login = 'No Service Found';
      this.options.id = 'No Service Found';
      this.options.email = 'No Service Found';
    }
  }

}
