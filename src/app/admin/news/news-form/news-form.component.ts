import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { DialogService } from '../../../services/dialog.service';
import { NewsService } from '../../../services/news.service';

import { CanComponentDeactivate } from '../../../guards/can-component-deactivate.interface';
import { News } from '../../../models/';

@Component({
  selector: 'app-news',
  templateUrl: './news-form.component.html',
  styleUrls: ['./news-form.component.css']
})
export class NewsFormComponent implements OnInit, CanComponentDeactivate {
  news: News;
  originalNews: News;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private newsService: NewsService,
    private dialogService: DialogService
  ) { }

  ngOnInit() {

    this.news = new News();

    const id = +this.route.snapshot.paramMap.get('id');

    if (id) { this.newsService.getNews(id).then( news => {
      this.news = news;

      // Был ли отредактирован (для гуарда)
      this.route.data.subscribe(data => {
        this.news = Object.assign(this.news, data.news);
        this.originalNews = Object.assign(this.news, data.news);
      });
    } ); }
  }

  saveNews(newsForm: NgForm) {
    Object.assign(this.news, newsForm.form.value);
    console.log(newsForm.form.value);
    this.news.createDate = new Date();
    if (this.news.id) {
      this.newsService.updateProduct(this.news).then(
        () => {
          // Последний отредактированный
          this.originalNews = Object.assign({}, this.news);
          this.router.navigate(['/admin/news', {id: this.news.id}]);
        }
      );
    } else {
      this.newsService.addNews(this.news).then(
        () => {
          this.originalNews = Object.assign({}, this.news);
          this.goBack();
        }
      );
    }
  }

  goBack() {
    this.router.navigate(['/admin/news']);
  }

  // Для гуарда
  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    const flags = [];
    for (const key in this.originalNews) {
      if (this.originalNews[key] === this.news[key]) {
        flags.push(true);
      } else {
        flags.push(false);
      }
    }

    if (flags.every(el => el)) {
      return true;
    }
    return this.dialogService.confirm('Discard changes?');
  }

}
