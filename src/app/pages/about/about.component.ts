import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AboutComponent implements OnInit {
  title = 'Shop location';
  lat = 53.884223;
  lng = 27.553332;

  constructor() { }

  ngOnInit() {
  }

}
