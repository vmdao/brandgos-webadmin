import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SettingService } from '../services';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private settingService: SettingService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    const currentUser = this.settingService.user;
    if (currentUser && typeof currentUser.accessToken === 'string') {
      request = request.clone({
        setHeaders: {
          Authorization: `${currentUser.accessToken}`,
        },
      });
    } else {
      request = request.clone({
        setHeaders: {
          Authorization: `Basic YXBwMToxMjM0NTY=`,
        },
      });
    }

    return next.handle(request);
  }
}
