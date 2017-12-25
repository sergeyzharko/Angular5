import {Injectable} from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

let TimeStart;

@Injectable()
export class MyInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // request interceptor
    let clonedRequest;

    if (req.url.includes('users')) {
      clonedRequest = req.clone({
        params: new HttpParams()
          .set('ts_interceptor', Date.now().toString())
      });
      console.log(clonedRequest);
    } else {
      clonedRequest = req;
    }

    return next.handle(clonedRequest)
    // response interceptor
    .map((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // do stuff with response
        console.log('Response Interceptor');
        console.log(event);
        console.log(event.body);
        return event;
      }
    });

  }
}


@Injectable()
export class TimingInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
// http://localhost:3000/users
    if (req.url.endsWith('users')) {
      TimeStart = Date.now();
    }

    return next.handle(req)
    // response interceptor
    .map((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse ) {
        if ( event.url.endsWith('users') ) { console.log(`Users HTTP Request time, ms: ${Date.now() - TimeStart}` ); }
        return event;
      }
    });

  }
}

@Injectable()
export class ServerAddressInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let clonedRequest;

    clonedRequest = req.clone({
      url: 'http://localhost:3000/' + req.url
    });

    return next.handle(clonedRequest);
  }
}
