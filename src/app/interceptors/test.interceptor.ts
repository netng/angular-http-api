import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TestInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const API_TOKEN = '2343jlfjfldsjlwj4l3j43';
    const requestCopy = request.clone(
      {
        setHeaders: {
          // ['api_token']: [API_TOKEN, 'fdafdalfdja']
          API_TOKEN,
          // api_key: API_TOKEN
        },
        body: {
          hello: 'world'
        }
      });

    console.log(requestCopy);
    return next.handle(requestCopy);
  }
}
