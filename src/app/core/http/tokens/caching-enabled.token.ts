import { HttpContextToken } from '@angular/common/http';

/**
 * HTTP token that determines whether an HTTP call has to be cached
 */
export const CACHE_RESPONSE = new HttpContextToken<boolean>(() => true);
