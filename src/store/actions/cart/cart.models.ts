import { CartItem } from 'routes/Order/Order.models';

export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

export interface AddToCartAction {
  type: typeof ADD_TO_CART;
  item: CartItem;
}

export interface RemoveFromCartAction {
  type: typeof REMOVE_FROM_CART;
  id: string;
}

export type CartActions = AddToCartAction | RemoveFromCartAction;
