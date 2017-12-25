import { Pipe, PipeTransform } from '@angular/core';

import { News } from '../models/';

@Pipe({
  name: 'orderBy'
})
export class NewsOrderPipe implements PipeTransform {

    transform(news: Array<News>): Array<News> {
      return news.sort(function (a, b) {
        if (a.createDate >= b.createDate) {
          return 1;
        }
        if (a.createDate < b.createDate) {
          return -1;
        }
        return 0;
      });
    }

}
