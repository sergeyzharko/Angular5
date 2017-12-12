import { Component, OnInit, ViewEncapsulation, Inject, Optional } from '@angular/core';

import { GeneratorService, Random5, RandomN } from './../../services';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GeneratorComponent implements OnInit {

  content: string;

  constructor( @Optional() @Inject(Random5) private randomString: string ) { }

  ngOnInit() {
    this.generate();
  }

  generate() {
    this.content = this.randomString ? this.randomString : 'No Service Found';
  }

}
