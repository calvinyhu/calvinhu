import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CartItem from '../CartItem/CartItem';
import { removeFromCart } from '../../store/actions/cartActions';

const removeFromCartHandlers = {};

const Cart = () => {
  const items = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const getRemoveFromCartHandler = id => {
    if (removeFromCartHandlers[id]) return removeFromCartHandlers[id];
    removeFromCartHandlers[id] = () => dispatch(removeFromCart(id));
    return removeFromCartHandlers[id];
  };

  return (
    <>
      {Object.keys(items).map(id => (
        <CartItem
          key={id}
          name={items[id].name}
          price={items[id].price}
          handleRemoveItem={getRemoveFromCartHandler(id)}
        />
      ))}
    </>
  );
};

export default Cart;
