import { createAction, props } from '@ngrx/store';
import { CartDetail } from 'src/app/models/CartDetail';
import { Item } from 'src/app/models/Item';


export const GET_CART = 'GET_CART';
export const GET_CART_SUCCESS = 'GET_CART_SUCCESS';
export const GET_CART_FAILURE = 'GET_CART_FAILURE';

export const ADD_TO_CART = 'ADD_TO_CART';
export const ADD_TO_CART_SUCCESS = 'ADD_TO_CART_SUCCESS';
export const ADD_TO_CART_FAILURE = 'ADD_TO_CART_FAILURE';

export const EMPTY_CART = 'EMPTY_CART';
export const EMPTY_CART_SUCCESS = 'EMPTY_CART_SUCCESS';
export const EMPTY_CART_FAILURE = 'EMPTY_CART_FAILURE';


export const getCart = createAction(
  GET_CART
);

export const getCartSuccess = createAction(
  GET_CART_SUCCESS,
  props<{ cartDetails: CartDetail[] }>()
);

export const getCartFailure = createAction(
  GET_CART_FAILURE,
  props<{ error: any }>()
);

export const addToCart = createAction(
  ADD_TO_CART,
  props<{ item: Item }>()
);

export const addToCartSuccess = createAction(
  ADD_TO_CART_SUCCESS,
);

export const addToCartFailure = createAction(
  ADD_TO_CART_FAILURE,
  props<{ error: any }>()
);

export const emptyCart = createAction(
  EMPTY_CART,
);

export const emptyCartSuccess = createAction(
  EMPTY_CART_SUCCESS,
);

export const emptyCartFailure = createAction(
  EMPTY_CART_FAILURE,
  props<{ error: any }>()
);
