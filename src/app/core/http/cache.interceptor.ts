import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { CacheService } from '../services/cache.service';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';

export const cacheInterceptor: HttpInterceptorFn = (req, next) => {
    const cacheService = inject(CacheService);
    cacheService.initCache();
    if (cacheService.cache.has(req.url) && !cacheService.cacheExpired(req.url)) {
        const cachedResponse = cacheService.cache.get(req.url).response;
        return of(cachedResponse.clone());
    } else {
        return next(req).pipe(
            tap((res) => {
                if (res instanceof HttpResponse) {
                    cacheService.cacheResponse(req.url, res);
                }
            }),
        );
    }
};
