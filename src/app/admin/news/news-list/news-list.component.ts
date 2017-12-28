import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { News } from '../../../models/';
import { NewsService } from '../../../services/';
import { OrderPipe } from '../../../pipes/order-by.pipe';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {
  allNews: Array<News>;

  selectedName: string;
  private editedNews: News;

  constructor( // Reserve the constructor for simple initialization such as wiring constructor parameters to properties.
    public newsService: NewsService,
    private orderPipe: OrderPipe,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getNews();

    // Последний отредактированный
    let id;
    this.route.paramMap.subscribe( params => { id = params.get('id'); });
    if (id) {
      this.route.paramMap
      .switchMap((params: Params) => this.newsService.getNews(+params.get('id')))
      .subscribe(
        (news: News) => {
          this.editedNews = Object.assign({}, news);
          console.log(`Last time you edit news ${JSON.stringify(this.editedNews)}`);
        },
        (err) => console.log(err)
      );
    }
  }

  getNews(): void {
    this.newsService.getAllNews()
    .then(news => {
      this.allNews = news;
      this.onOrder();
    })
    .catch(() => Promise.reject('Error in getProducts method'));
  }

  deleteNews(news): void {
    this.newsService.removeNews(news)
      // Обновление списка:
      .then(() => this.allNews = this.allNews.filter(t => t !== news))
      .catch(err => console.log(err));
  }

  onEdit(news): void {
    const link = ['edit', news.id];
    this.router.navigate(link, {relativeTo: this.route});
  }

  onNew(): void {
    const link = ['new'];
    this.router.navigate(link, {relativeTo: this.route});
  }

  isEdited(news: News) {
    if (this.editedNews) {
      return news.id === this.editedNews.id;
    }
    return false;
  }

  onOrder() {
    this.allNews = this.orderPipe.transform(this.allNews, 'createDate');
  }

}
