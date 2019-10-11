import { CartState } from './cart.models';
import {
  CartActions,
  ADD_TO_CART,
  REMOVE_FROM_CART,
} from '../../actions/cart/cart.models';

export const cartState: CartState = {
  items: {},
};

const cartReducer = (state = cartState, action: CartActions) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        items: { ...state.items, ...action.item },
      };
    case REMOVE_FROM_CART:
      const items = { ...state.items };
      delete items[action.id];
      return { ...state, items };
    default:
      return state;
  }
};

export default cartReducer;
