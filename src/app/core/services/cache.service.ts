import { Injectable } from '@angular/core';
import { HttpCachedResponse } from '../models/http-cached-response.model';
import { HttpResponse } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class CacheService {
    cache = new Map<string, HttpCachedResponse>(this._initCacheFromStorage());
    timeToLiveInSeconds: number = 30;

    private readonly _cacheStorageKey = 'HTTP_CACHE';

    constructor() {}

    cacheExpired(url: string): boolean {
        const cachedResponse = this.cache.get(url);
        if (cachedResponse) {
            const nowSeconds = new Date().getSeconds();
            const cachedResponseSeconds = cachedResponse.date.getSeconds();
            const diff = nowSeconds - cachedResponseSeconds;
            return diff >= this.timeToLiveInSeconds;
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
        if (cacheString) {
            return new Map<string, HttpCachedResponse>(JSON.parse(cacheString));
        }
    }

    private _saveCacheInStorage(): void {
        const saveValue = Array.from(this.cache);
        localStorage.setItem(this._cacheStorageKey, JSON.stringify(saveValue));
    }
}
