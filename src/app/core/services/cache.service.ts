import { Injectable, Signal, signal } from '@angular/core';
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
    private readonly _ttlDefaultValue = 7_200_000;
    /**
     * Cache's TTL in milliseconds
     */
    private _timeToLiveInMillis = signal<number>(this._initTtlFromStorage());

    private readonly _cacheStorageKey = 'HTTP_CACHE';
    private readonly _ttlStorageKey = 'CACHE_TTL_MILLIS';

    constructor() {
        this.initCache();
    }

    get timeToLiveInMillis(): Signal<number> {
        return this._timeToLiveInMillis.asReadonly();
    }

    setTimeToLive(value: number) {
        this._timeToLiveInMillis.set(value);
        this._saveTtlInStorage();
    }

    initCache(): void {
        this.cache = new Map<string, HttpCachedResponse>(this._initCacheFromStorage());
        this._timeToLiveInMillis.set(this._initTtlFromStorage());
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
            return diff >= this._timeToLiveInMillis();
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

    private _initTtlFromStorage(): number {
        const ttlString = localStorage.getItem(this._ttlStorageKey);
        return ttlString ? parseInt(ttlString) : this._ttlDefaultValue;
    }

    private _saveTtlInStorage(): void {
        localStorage.setItem(this._ttlStorageKey, JSON.stringify(this._timeToLiveInMillis()));
    }
}
