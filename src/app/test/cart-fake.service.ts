import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { ICartService } from '../services/cart.service';
@Injectable()
export class CartFakeService implements ICartService {
  addItemToCart: jasmine.Spy = jasmine.createSpy('addItemToCart').and.returnValue(of());
  emptyCart: jasmine.Spy = jasmine.createSpy('emptyCart').and.returnValue(of());
  getCartDetails: jasmine.Spy = jasmine.createSpy('getCartDetails').and.returnValue(of([]));
  calculateSummary: jasmine.Spy = jasmine.createSpy('getReviews').and.returnValue(of({}));
}
