import { CartState } from './cart.reducer';
import { selectCart } from './cart.selectors';

describe('Cart selector', () => {
  let appState;
  let cartDetail;

  beforeEach(() => {
    cartDetail = {item: {id: 12345, name: 'name', price: 3.0}, quantity: 1};
    const cartState = <CartState>{
      cart: { roots: [cartDetail] },
      loading: {},
      error: null
    };

    appState = {
      cart: cartState
    };
  });

  describe('selectCart', () => {
    it('should return correct cartDetails', () => {
      const result = selectCart(appState);
      expect(result).toEqual([cartDetail]);
    });
  });
});
