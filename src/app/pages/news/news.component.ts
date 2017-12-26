import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { News } from '../../models/news.model';
import { NewsService } from '../../services';
import { NewsOrderPipe } from '../../pipes/order-by.pipe';

@Component({
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  allNews: Array<News>;
  errorMessage: string;

  constructor(
    private newsService: NewsService,
    private orderPipe: NewsOrderPipe,
    private router: Router
  ) { }

  ngOnInit() {
    this.newsService.getAllNews()
    .then(news => {
      this.allNews = news;
      this.onOrder();
    })
    .catch(() => Promise.reject('Error in getAllNews method'));
  }

  onOrder() {
    this.allNews = this.orderPipe.transform(this.allNews);
  }

}
