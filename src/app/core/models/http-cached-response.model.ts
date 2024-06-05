import { HttpResponse } from '@angular/common/http';

export interface HttpCachedResponse {
    date: Date;
    response: HttpResponse<unknown>;
}
