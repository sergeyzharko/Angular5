import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { NewsRoutingModule, newsRouterComponents } from './news.routing.module';
import { NewsComponent } from '.';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NewsRoutingModule
  ],
  declarations: [
    newsRouterComponents,
    NewsComponent
  ]
})
export class NewsModule {}
