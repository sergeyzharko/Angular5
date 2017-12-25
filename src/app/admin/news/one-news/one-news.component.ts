import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { News } from './../../../models';

@Component({
  selector: 'app-one-news',
  templateUrl: './one-news.component.html',
  styleUrls: ['./one-news.component.css']
})
export class OneNewsComponent {
  @Input() news: News;
  @Output() onDelete = new EventEmitter<News>();

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  editNews() {
    const link = ['/admin/news/edit', this.news.id];
    this.router.navigate(link);
  }

  deleteNews() {
    this.onDelete.emit(this.news);
  }

}
