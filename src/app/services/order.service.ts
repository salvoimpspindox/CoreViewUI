import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { APP_CONFIG, IAppConfig } from '../app.config';
import { CreateOrder } from '../models/CreateOrder';
import { PaymentInfo } from '../models/PaymentInfo';

@Injectable()
export class OrderService {
  constructor(private http: HttpClient, @Inject(APP_CONFIG) private config: IAppConfig) {}

  createOrder(order: CreateOrder): Observable<number> {
    return this.http.post<number>(`${this.config.apiEndpoint}orders/`, order);
  }

  payOrder(orderId: number, paymentInfo: PaymentInfo): Observable<void> {
    return this.http.post<void>(`${this.config.apiEndpoint}orders/${orderId}/pay`, paymentInfo);
  }

}
