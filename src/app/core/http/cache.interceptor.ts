import { HttpEventType, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { CacheService } from '../services/cache.service';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';

/**
 * HTTP interceptors that uses the CacheService to apply caching logic
 * @param req
 * @param next
 */
export const cacheInterceptor: HttpInterceptorFn = (req, next) => {
    const cacheService = inject(CacheService);
    // inits cache map from storage
    cacheService.initCache();
    // checks is request URL is in cache and if it's not expired
    if (cacheService.cache.has(req.url) && !cacheService.cacheExpired(req.url)) {
        // returns the cached HTTP response
        const cachedResponse = cacheService.cache.get(req.url).response;
        return of(
            new HttpResponse({
                body: cachedResponse.body,
            }),
        );
    } else {
        // forwards the request caching its response upon completion
        return next(req).pipe(
            tap((event) => {
                if (event.type === HttpEventType.Response) {
                    cacheService.cacheResponse(req.url, event);
                }
            }),
        );
    }
};
