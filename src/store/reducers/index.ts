import { combineReducers } from 'redux';
import { AppState } from './app/app.models';
import appReducer from './app/app';
import { CartState } from './cart/cart.models';
import cartReducer from './cart/cart';

export interface RootState {
  app: AppState;
  cart: CartState;
}

const rootReducer = combineReducers({ app: appReducer, cart: cartReducer });

export default rootReducer;
