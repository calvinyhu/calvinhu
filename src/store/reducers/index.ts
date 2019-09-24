import { combineReducers } from 'redux';
import { AppState } from './appReducer.models';
import appReducer from './appReducer';
import { CartState } from './cartReducer.models';
import cartReducer from './cartReducer';

export interface RootState {
  app: AppState;
  cart: CartState;
}

const rootReducer = combineReducers({ app: appReducer, cart: cartReducer });

export default rootReducer;
