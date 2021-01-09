import { ActionReducerMap } from '@ngrx/store';
import { cartReducer, CartState } from './cart/cart.reducer';
import { CartEffects } from './cart/cart.effects';

export interface AppState {
    cart: CartState;
}

export const reducers: ActionReducerMap<AppState> = {
    cart: cartReducer
}

export const effects: any[] = [
  CartEffects
];
