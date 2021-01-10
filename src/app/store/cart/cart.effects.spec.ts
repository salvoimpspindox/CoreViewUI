import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { EffectsMetadata, Actions, getEffectsMetadata } from '@ngrx/effects';
import { Observable, of, throwError } from 'rxjs';
import { CartEffects } from './cart.effects';
import { CartFakeService } from '../../test/cart-fake.service';
import { CartService } from 'src/app/services/cart.service';
import { getCart, getCartSuccess, getCartFailure } from './cart.action';
import { CartDetail } from '../../models/CartDetail';
import { ToastrModule } from 'ngx-toastr';

describe('Cart effects', () => {
  let effects: CartEffects;
  let effectMetadata: EffectsMetadata<CartEffects>;
  let actions$: Observable<any>;
  let testSubject: CartFakeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CartEffects,
        provideMockActions(() => actions$),
        { provide: CartService, useClass: CartFakeService }
      ],
      imports: [
        ToastrModule.forRoot({
          disableTimeOut: true,
          tapToDismiss: false,
          progressBar: true,
          onActivateTick: true,
      })
      ]
    });

    actions$ = TestBed.get(Actions);
    effects = TestBed.get(CartEffects);
    effectMetadata = getEffectsMetadata(effects);
    testSubject = TestBed.get(CartService);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('getCart$', () => {
    it('should return GetCartSuccess', () => {
      const cartDetails: CartDetail[] = [];
      testSubject.getCartDetails.and.returnValue(of(cartDetails));
      actions$ = of(getCart());
      effects.getCart$.subscribe((res) => {
        expect(res).toEqual(getCartSuccess({ cartDetails }));
      expect(testSubject.getCartDetails).toHaveBeenCalledTimes(1);
      });
    });

    it('should return GetCartFailure', () => {
      const error = 'error';
      testSubject.getCartDetails.and.returnValue(throwError({error}));
      actions$ = of(getCart());
      effects.getCart$.subscribe((res) => {
        expect(res).toEqual(getCartFailure({error}));
      expect(testSubject.getCartDetails).toHaveBeenCalledTimes(1);
      });
    });
  });

});
