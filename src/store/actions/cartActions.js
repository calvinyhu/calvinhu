export const types = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
};

export const addToCart = item => ({
  type: types.ADD_TO_CART,
  item,
});

export const removeFromCart = id => {
  return {
    type: types.REMOVE_FROM_CART,
    id,
  };
};
