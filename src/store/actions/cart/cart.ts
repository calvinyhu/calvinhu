import { CartItem } from 'routes/Order/Order.models';

import {
  ADD_TO_CART,
  AddToCartAction,
  REMOVE_FROM_CART,
  RemoveFromCartAction,
} from './cart.models';

export const addToCart = (item: CartItem): AddToCartAction => ({
  type: ADD_TO_CART,
  item,
});

export const removeFromCart = (id: string): RemoveFromCartAction => ({
  type: REMOVE_FROM_CART,
  id,
});
