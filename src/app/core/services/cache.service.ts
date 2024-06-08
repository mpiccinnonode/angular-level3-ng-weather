import { Injectable } from '@angular/core';
import { HttpCachedResponse } from '../models/http-cached-response.model';
import { HttpResponse } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class CacheService {
    /**
     * Cache object
     */
    cache = new Map<string, HttpCachedResponse>();
    /**
     * Cache's TTL in milliseconds
     */
    timeToLiveInMillis: number = 30000;

    private readonly _cacheStorageKey = 'HTTP_CACHE';

    constructor() {
        this.cache = this._initCacheFromStorage();
    }

    initCache(): void {
        this.cache = new Map<string, HttpCachedResponse>(this._initCacheFromStorage());
    }

    cacheExpired(url: string): boolean {
        const cachedResponse = this.cache.get(url);
        if (cachedResponse) {
            /**
             * Checks the milliseconds difference between the actual date/time
             * and the cached response's one
             */
            const nowMillis = Date.now();
            const cachedResponseMillis = new Date(cachedResponse.date).getTime();
            const diff = nowMillis - cachedResponseMillis;
            return diff >= this.timeToLiveInMillis;
        } else {
            return false;
        }
    }

    cacheResponse(url: string, response: HttpResponse<unknown>): void {
        this.cache.set(url, { response, date: new Date() });
        this._saveCacheInStorage();
    }

    private _initCacheFromStorage(): Map<string, HttpCachedResponse> {
        const cacheString = localStorage.getItem(this._cacheStorageKey);
        return new Map<string, HttpCachedResponse>(cacheString && JSON.parse(cacheString));
    }

    private _saveCacheInStorage(): void {
        const saveValue = Array.from(this.cache);
        localStorage.setItem(this._cacheStorageKey, JSON.stringify(saveValue));
    }
}
