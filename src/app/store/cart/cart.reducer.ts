import {createReducer, on, Action} from '@ngrx/store';
import * as cartActions from './cart.action';
import { CartDetail } from 'src/app/models/CartDetail';

export interface CartState {
  loading: boolean;
  error: any;
  cart: { roots: CartDetail[] };
}

export const initialCartState: CartState = {
  cart: {roots: [] },
  loading: false,
  error: null
};

const cart = createReducer(
  initialCartState,
  on(cartActions.getCart, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(cartActions.getCartSuccess, (state, action) => ({
    cart: {roots: action.cartDetails},
    loading: false,
    error: null
  })),
  on(cartActions.getCartFailure, (state, action) => ({
    ...state,
    loading: false,
    error: action.error
  }))
);

export function cartReducer(state: any, action: Action) {
  return cart(state, action);
}


