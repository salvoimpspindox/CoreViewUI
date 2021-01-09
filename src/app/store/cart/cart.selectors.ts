import { AppState } from '../store';
import { CartDetail } from '../../models/CartDetail';
import { CartState } from './cart.reducer';
import { Selector, createSelector } from '@ngrx/store';

const getCartState = (state: AppState) => state.cart;

export const selectCart: Selector<AppState, CartDetail[]> = createSelector(
  getCartState,
  (state: CartState) => state.cart.roots
);
