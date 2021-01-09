import { Injectable } from '@angular/core';
import * as cartActions from './cart.action';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { CartService } from '../../services/cart.service';
import { CartDetail } from '../../models/CartDetail';
import { ToastrService } from 'ngx-toastr';
import { emptyCart } from './cart.action';

@Injectable()
export class CartEffects {
  constructor(private readonly actions: Actions, private readonly cartService: CartService,
    private toastrService: ToastrService) {}

  @Effect()
  getCart$ = this.actions.pipe(
    ofType(cartActions.getCart),
    switchMap((action) =>
      this.cartService
        .getCartDetails()
        .pipe(
          map((cartDetails: CartDetail[]) => cartActions.getCartSuccess({ cartDetails })),
          catchError((error: any) => of(cartActions.getCartFailure(error)))
        )
    )
  );

  @Effect()
  addToCart$ = this.actions.pipe(
    ofType(cartActions.addToCart),
    switchMap((action) =>
      this.cartService
        .addItemToCart(action.item.id)
        .pipe(
          map(() => cartActions.addToCartSuccess()),
          catchError((error: any) => of(cartActions.addToCartFailure(error)))
        )
    )
  );

  @Effect()
  emptyCart$ = this.actions.pipe(
    ofType(cartActions.emptyCart),
    switchMap((action) =>
      this.cartService
        .emptyCart()
        .pipe(
          map(() => cartActions.emptyCartSuccess()),
          catchError((error: any) => of(cartActions.emptyCartFailure(error)))
        )
    )
  );

  @Effect()
  addToCartSuccess$ = this.actions.pipe(ofType(cartActions.addToCartSuccess), map(() => cartActions.getCart()));

  @Effect()
  emptyCartSuccess$ = this.actions.pipe(ofType(cartActions.emptyCartSuccess), map(() => cartActions.getCart()));

  @Effect({ dispatch: false })
  addToCartFailure$ = this.actions.pipe(ofType(cartActions.addToCartFailure), tap((error : any) => this.toastrService.warning('Elemento già presente nel carrello')));

}
