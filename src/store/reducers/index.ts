import { combineReducers } from 'redux';
import { CartState } from './cartReducer.models';
import cartReducer from './cartReducer';

export interface RootState {
  cart: CartState;
}

const rootReducer = combineReducers({ cart: cartReducer });

export default rootReducer;
