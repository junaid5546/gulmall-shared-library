import * as i0 from '@angular/core';
import { Component, Injectable, NgModule } from '@angular/core';
import * as i1 from '@angular/common/http';
import { HttpResponse, HttpClientModule, HttpClientJsonpModule, HTTP_INTERCEPTORS, HttpEventType } from '@angular/common/http';
import { of, tap, EMPTY, BehaviorSubject, retry, map, catchError as catchError$1, throwError, finalize, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as i2 from '@angular/material/progress-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import * as i3 from '@angular/common';
import { CommonModule } from '@angular/common';

class ApiLibComponent {
    constructor() { }
    ngOnInit() {
    }
}
ApiLibComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ApiLibComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
ApiLibComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: ApiLibComponent, selector: "lib-api-lib", ngImport: i0, template: `
    <p>
      api-lib works!
    </p>
  `, isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ApiLibComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'lib-api-lib',
                    template: `
    <p>
      api-lib works!
    </p>
  `,
                    styles: []
                }]
        }], ctorParameters: function () { return []; } });

class CacheResolverService {
    constructor() {
        // we will store HttpResponse in a map with key as unique identifire.
        // this will be acting as a identifire and it will hold the list of responses.
        this.cache = new Map();
    }
    set(key, value, timeToLive = null) {
        console.log('set cache key', key);
        if (timeToLive) {
            const expiresIn = new Date();
            expiresIn.setSeconds(expiresIn.getSeconds() + timeToLive);
            // if we dont have to expire then put null here.
            this.cache.set(key, [expiresIn, value]);
        }
    }
    get(key) {
        const tuple = this.cache.get(key);
        if (!tuple)
            return null;
        // extract tuple.
        const expiresIn = tuple[0];
        const httpSavedResponse = tuple[1];
        const timeNow = new Date();
        if (expiresIn && expiresIn.getTime() < timeNow.getTime()) {
            this.cache.delete(key);
            return null;
        }
        return httpSavedResponse;
    }
}
CacheResolverService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: CacheResolverService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
CacheResolverService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: CacheResolverService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: CacheResolverService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return []; } });

const TIME_TO_LIVE = 10;
class CacheInterceptor {
    constructor(cacheResolver) {
        this.cacheResolver = cacheResolver;
    }
    intercept(request, next) {
        if (request.method != 'GET') {
            return next.handle(request);
        }
        const cachedResponse = this.cacheResolver.get(request.url);
        return cachedResponse ? of(cachedResponse) : this.sendRequest(request, next);
    }
    sendRequest(request, next) {
        return next.handle(request)
            .pipe(tap((event) => {
            if (event instanceof HttpResponse) {
                this.cacheResolver.set(request.url, event, TIME_TO_LIVE);
            }
        }));
    }
}
CacheInterceptor.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: CacheInterceptor, deps: [{ token: CacheResolverService }], target: i0.ɵɵFactoryTarget.Injectable });
CacheInterceptor.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: CacheInterceptor });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: CacheInterceptor, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: CacheResolverService }]; } });

class ErrorInterceptor {
    constructor() { }
    intercept(request, next) {
        return next.handle(request).pipe(catchError((error) => {
            if (error.error instanceof Error) {
                // A client-side or network error occurred. Handle it accordingly.
                console.error('An error occurred:', error.error.message);
            }
            else {
                // The backend returned an unsuccessful response code.
                // The response body may contain clues as to what went wrong,
                console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
            }
            // If you want to return a new response:
            // return of(new HttpResponse({body: [{name: "Default value..."}]}));
            // If you want to return the error on the upper level:
            // return throwError(error);
            // or just return nothing:
            return EMPTY;
        }));
    }
}
ErrorInterceptor.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ErrorInterceptor, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
ErrorInterceptor.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ErrorInterceptor });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ErrorInterceptor, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return []; } });

class CustomHeaderInterceptor {
    constructor() { }
    intercept(req, next) {
        const api_key = "jgs";
        const token = "000111";
        /*const reqWithAuth = req.clone({
          setHeaders:{
            api_key,
            Authorization:`Bearer${token}`
          }
        });*/
        return next.handle(req);
    }
}
CustomHeaderInterceptor.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: CustomHeaderInterceptor, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
CustomHeaderInterceptor.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: CustomHeaderInterceptor, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: CustomHeaderInterceptor, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return []; } });

class LoaderService {
    constructor() {
        this.isLoading = new BehaviorSubject(false);
        this.progress = 0;
        this.bufferValue = 0;
        this.isLoading.subscribe(res => {
            console.log("LOADING: ", res);
        });
    }
}
LoaderService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: LoaderService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
LoaderService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: LoaderService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: LoaderService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return []; } });

class ResponseInterceptor {
    constructor(loaderService) {
        this.loaderService = loaderService;
    }
    intercept(request, next) {
        const startTime = new Date().getTime();
        this.loaderService.isLoading.next(true);
        return next.handle(request)
            .pipe(retry(2), map((event) => {
            const endTime = new Date().getTime();
            const difference = endTime - startTime;
            console.log(`${event.url} succeed in ${difference} ms.`);
            return event;
        }), catchError$1((error) => {
            return throwError(() => {
                new Error('Test');
            });
        }), finalize(() => {
            this.loaderService.isLoading.next(false);
        }));
    }
}
ResponseInterceptor.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ResponseInterceptor, deps: [{ token: LoaderService }], target: i0.ɵɵFactoryTarget.Injectable });
ResponseInterceptor.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ResponseInterceptor });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ResponseInterceptor, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: LoaderService }]; } });

class ProgressComponent {
    constructor(loader) {
        this.loader = loader;
        this.color = 'primary';
        this.mode = 'buffer';
        this.value = 50;
        this.bufferValue = 75;
        this.loading = false;
    }
    ngOnInit() {
        this.loader.isLoading.subscribe(res => {
            this.loading = res;
            this.value = this.loader.progress;
            this.bufferValue = this.loader.bufferValue;
        });
    }
}
ProgressComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ProgressComponent, deps: [{ token: LoaderService }], target: i0.ɵɵFactoryTarget.Component });
ProgressComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: ProgressComponent, selector: "lib-progress", ngImport: i0, template: "\n\n  <div *ngIf=\"true\" class=\"progress\">\n      \n      <section class=\"example-section\">\n        <mat-progress-bar\n            class=\"example-margin\"\n            [color]=\"color\"\n            [mode]=\"mode\"\n            [value]=\"loader.progress\"\n            [bufferValue]=\"loader.bufferValue\">\n        </mat-progress-bar>\n      </section>\n  </div>", styles: [".example-h2{margin:10px}.example-section{display:flex;align-content:center;align-items:center;height:60px}.example-margin{margin:0 10px}.progress{width:100%;background-color:orange;z-index:1000;position:absolute}\n"], components: [{ type: i2.MatProgressBar, selector: "mat-progress-bar", inputs: ["color", "value", "bufferValue", "mode"], outputs: ["animationEnd"], exportAs: ["matProgressBar"] }], directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ProgressComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-progress', template: "\n\n  <div *ngIf=\"true\" class=\"progress\">\n      \n      <section class=\"example-section\">\n        <mat-progress-bar\n            class=\"example-margin\"\n            [color]=\"color\"\n            [mode]=\"mode\"\n            [value]=\"loader.progress\"\n            [bufferValue]=\"loader.bufferValue\">\n        </mat-progress-bar>\n      </section>\n  </div>", styles: [".example-h2{margin:10px}.example-section{display:flex;align-content:center;align-items:center;height:60px}.example-margin{margin:0 10px}.progress{width:100%;background-color:orange;z-index:1000;position:absolute}\n"] }]
        }], ctorParameters: function () { return [{ type: LoaderService }]; } });

class ApiLibModule {
}
ApiLibModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ApiLibModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ApiLibModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ApiLibModule, declarations: [ApiLibComponent,
        ProgressComponent], imports: [HttpClientModule,
        HttpClientJsonpModule,
        MatProgressBarModule,
        CommonModule], exports: [CommonModule,
        ApiLibComponent,
        ProgressComponent,
        MatProgressBarModule] });
ApiLibModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ApiLibModule, providers: [
        CacheResolverService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: CustomHeaderInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: CacheInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ResponseInterceptor,
            multi: true
        }
    ], imports: [[
            HttpClientModule,
            HttpClientJsonpModule,
            MatProgressBarModule,
            CommonModule,
        ], CommonModule,
        MatProgressBarModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ApiLibModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        ApiLibComponent,
                        ProgressComponent,
                    ],
                    imports: [
                        HttpClientModule,
                        HttpClientJsonpModule,
                        MatProgressBarModule,
                        CommonModule,
                    ],
                    exports: [
                        CommonModule,
                        ApiLibComponent,
                        ProgressComponent,
                        MatProgressBarModule,
                    ],
                    providers: [
                        CacheResolverService,
                        {
                            provide: HTTP_INTERCEPTORS,
                            useClass: CustomHeaderInterceptor,
                            multi: true
                        },
                        {
                            provide: HTTP_INTERCEPTORS,
                            useClass: CacheInterceptor,
                            multi: true
                        },
                        {
                            provide: HTTP_INTERCEPTORS,
                            useClass: ErrorInterceptor,
                            multi: true
                        },
                        {
                            provide: HTTP_INTERCEPTORS,
                            useClass: ResponseInterceptor,
                            multi: true
                        }
                    ]
                }]
        }] });

const BASICTOKEN = 'eXV6ZWVfY2xpZW50OjI5MDIzNmNmLTgxZDItNDg5MS1hYmNlLWYzZmUzYzA5NWMxMA==';
//export const SERVER_IP = 'backend-development.digitalmall.app';
const SERVER_IP = 'backend-development.digitalmall.app';

class JGSApiService {
    // CONSTRUCTOR API SERVICE
    constructor(http, loader) {
        this.http = http;
        this.loader = loader;
        this.tokenName = 'dm-token';
        this.language = 'lang';
        this.getTokenUrl = 'sessions/token';
        this.appBaseUrl = `https://${SERVER_IP}/api/`;
        this.getTokenAccess = {};
        this.headersConfig = {};
        this.errorSubscriber = new Subject();
        this.postImages = (route) => {
            return this.http.post(this.appBaseUrl + route.apiroute, route.data, {
                headers: this.headersConfig,
                reportProgress: true,
                observe: 'events',
            })
                .subscribe(event => {
                if (event.type === HttpEventType.UploadProgress) {
                    let progress = Math.round(event.loaded / event.total * 100) + '%';
                    this.loader.progress = Math.round(event.loaded / event.total * 100);
                    console.log("PROGRESS: ", progress);
                    this.loader.isLoading.next(true);
                    //console.log('Uploading:' + Math.round(event.loaded/ event.total! *100) + '%');
                    if (event.loaded == event.total) {
                        this.loader.isLoading.next(false);
                        console.log("Event Loaded", event);
                    }
                }
            });
        };
    }
    getRequestTest() {
        return this.http
            .get('https://backend-development.digitalmall.app/api/vehicle-for-sale/post-statuses', { responseType: 'text' })
            .pipe(tap({
            next: (data) => console.log(data),
        }));
    }
}
JGSApiService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: JGSApiService, deps: [{ token: i1.HttpClient }, { token: LoaderService }], target: i0.ɵɵFactoryTarget.Injectable });
JGSApiService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: JGSApiService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: JGSApiService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: LoaderService }]; } });

class MediaService {
    constructor(api) {
        this.api = api;
    }
    uploadFile(formData, media_type, entity_id) {
        let apiRoute = {};
        apiRoute.apiroute = `storage/${media_type}/${entity_id}`;
        apiRoute.data = formData;
        return this.api.postImages(apiRoute);
    }
}
MediaService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MediaService, deps: [{ token: JGSApiService }], target: i0.ɵɵFactoryTarget.Injectable });
MediaService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MediaService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: MediaService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: JGSApiService }]; } });

/*
 * Public API Surface of api-lib
 */

/**
 * Generated bundle index. Do not edit.
 */

export { ApiLibComponent, ApiLibModule, MediaService, ProgressComponent };
//# sourceMappingURL=api-package.mjs.map
