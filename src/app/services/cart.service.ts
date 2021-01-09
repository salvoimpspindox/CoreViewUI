import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, IAppConfig } from '../app.config';
import { Observable } from 'rxjs';
import { CartDetail } from '../models/CartDetail';
import { CartSummary } from '../models/CartSummary';
import { CreateOrder } from '../models/CreateOrder';

@Injectable()
export class CartService {
  constructor(private http: HttpClient, @Inject(APP_CONFIG) private config: IAppConfig) {}

  addItemToCart(itemId: number): Observable<void> {
    return this.http.post<void>(`${this.config.apiEndpoint}cart/addItem/${itemId}`, null);
  }

  emptyCart(): Observable<void> {
    return this.http.post<void>(`${this.config.apiEndpoint}cart/empty`, null);
  }

  getCartDetails(): Observable<CartDetail[]> {
    return this.http.get<CartDetail[]>(`${this.config.apiEndpoint}cart/details`);
  }

  calculateSummary(cart: CreateOrder): Observable<CartSummary> {
    return this.http.post<CartSummary>(`${this.config.apiEndpoint}cart/calculateSummary`, cart);
  }
}
