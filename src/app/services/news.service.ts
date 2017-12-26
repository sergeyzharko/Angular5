import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { News } from '../models/news.model';

@Injectable() // decorator tells Angular that this service might itself have injected dependencies
export class NewsService {
  news: Array<News>;
  private newsUrl = 'news';

  constructor(
    private http: HttpClient
  ) {}

  getAllNews(): Promise<News[]> {
    return this.http.get(this.newsUrl)
            .toPromise()
            .then( response => <News[]>response)
            .catch(this.handleError);
  }

  getNews(id: number | string): Promise<News> {
    return this.http.get(`${this.newsUrl}/${id}`)
            .toPromise()
            .then( response => <News>response)
            .catch(this.handleError);
  }

  newId(): number {
    let maxId, newId;
    this.getAllNews()
    .then(news => {
      this.news = news;
      maxId = 1;
      for ( let i = 0; i < this.news.length; i++ ) {
        if ( this.news[i].id > maxId ) { maxId = this.news[i].id; }
      }
      newId = maxId + 1;
    }).catch(() => Promise.reject('Error in getProducts method'));
    return newId;
  }

  addNews(product: News): Promise<any> {
    product.id = this.newId();
    const url = this.newsUrl,
    body = JSON.stringify(product),
    options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    return this.http.post(url, body, options)
        .toPromise()
        .then( response => <News>response )
        .catch( this.handleError );
  }

  removeNews(news: News): Promise<News[]> {
    const url = `${this.newsUrl}/${news.id}`;

    return this.http.delete(url)
            .toPromise()
            .then( response => <News>response)
            .catch( this.handleError );
    }

  updateProduct(product: News): Promise<News> {
    const url = `${this.newsUrl}/${product.id}`,
      body = JSON.stringify(product),
      options = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      };

    return this.http.put(url, body, options)
            .toPromise()
            .then( response => <News>response )
            .catch( this.handleError );
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
