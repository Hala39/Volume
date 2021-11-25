import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {  delay, finalize } from 'rxjs/operators';
import { BusyService } from '../services/busy.service';

@Injectable()
export class BusyInterceptor implements HttpInterceptor {

  constructor(private busyService: BusyService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.includes("post") || request.url.includes('account')) {
      this.busyService.busy();
    }
    return next.handle(request).pipe(
      finalize(() => {
        this.busyService.idle();
      })
    )
  }
}
