import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AgmCoreModule } from '@agm/core';

import { PagesRoutingModule, pagesRouterComponents } from './pages.routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCt87xDw1zzoBOTzmSn6r8OdE220cn_MKc'
    })
  ],
  declarations: [
    pagesRouterComponents
  ]
})
export class PagesModule { }
