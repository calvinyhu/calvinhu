import { types } from '../actions/cartActions';

const initialState = {
  items: {},
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_TO_CART:
      return {
        ...state,
        items: { ...state.items, ...action.item },
      };
    case types.REMOVE_FROM_CART:
      const items = { ...state.items };
      delete items[action.id];
      return { ...state, items };
    default:
      return state;
  }
};

export default cartReducer;
