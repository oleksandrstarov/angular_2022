import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { LoaderService } from './../app/services/loader.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
    private requestNumber: number = 0;

    constructor(private loaderService: LoaderService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.requestNumber === 0) {
            this.loaderService.show();
        }

        this.requestNumber++;

        return next.handle(request).pipe(
            finalize(() => {
                this.requestNumber--;
                if (this.requestNumber === 0) {
                    this.loaderService.hide();
                }
            })
        );
    }
}