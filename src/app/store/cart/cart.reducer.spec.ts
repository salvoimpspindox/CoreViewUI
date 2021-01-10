import { getCart, getCartSuccess, getCartFailure } from './cart.action';
import { cartReducer, initialCartState } from './cart.reducer';

describe('Cart reducer', () => {
  describe('undefined action', () => {
      it('should return default state', () => {
          const action = {};
          const state = cartReducer(undefined, action as any);
          expect(state).toBe(initialCartState);
      });
  });

  describe('getCart actions', () => {
      it('should set loading to true', () => {
          const originalState = { ...initialCartState, cart: {}, loading: {}, error: undefined };
          const action = getCart();
          const state = cartReducer(originalState, action);
          expect(state.loading).toBe(true);
      });
  });

  describe('getCartSuccess actions', () => {
      it('should set the error to undefined', () => {
          const originalState = { ...initialCartState, error: 'an error' };
          const action = getCartSuccess({cartDetails: []});
          const state = cartReducer(originalState, action);
          expect(state.error).toBeNull();
      });
      it('should set loading to false', () => {
          const originalState = { ...initialCartState, cart: {}, loading: {}, error: undefined };
          const action = getCartSuccess({cartDetails: []});
          const state = cartReducer(originalState, action);
          expect(state.loading).toBe(false);
      });
  });

  describe('getCartFailure actions', () => {
      it('should set loading to false', () => {
          const originalState = { ...initialCartState, permissions: {}, loading: {}, error: undefined };
          const action = getCartFailure({error: 'This is and error'});
          const state = cartReducer(originalState, action);
          expect(state.loading).toBe(false);
      });
      it('should set the error', () => {
          const originalState = { ...initialCartState, permissions: {}, loading: {}, error: undefined };
          const action = getCartFailure({error: 'the error'});
          const state = cartReducer(originalState, action);
          expect(state.error).toBe('the error');
      });
  });
});
