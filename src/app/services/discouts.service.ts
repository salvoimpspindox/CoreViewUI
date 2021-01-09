import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, IAppConfig } from '../app.config';
import { Observable } from 'rxjs';
import { Discount } from '../models/Discount';

@Injectable()
export class DiscountsService {
  constructor(private http: HttpClient, @Inject(APP_CONFIG) private config: IAppConfig) {}

  getDiscount(discountCode: string): Observable<Discount> {
    return this.http.get<Discount>(`${this.config.apiEndpoint}discounts/${discountCode}`);
  }
}
