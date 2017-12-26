import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { News } from './../models';
import { NewsService } from './../services';

@Injectable()
export class NewsResolveGuard implements Resolve<News> {

  constructor(
    private newsService: NewsService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot): Promise<News> | null {
    const id = +route.paramMap.get('id');

    return this.newsService.getNews(id).then(news => {
      if (news) {
        return news;
      } else { // id not found
        this.router.navigate(['../']);
        return null;
      }
    });
  }
}
