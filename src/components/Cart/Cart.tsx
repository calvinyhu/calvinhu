import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classnames from 'classnames';

import Button from 'components/UI/Button/Button';
import CartItem from '../CartItem/CartItem';
import { CartProps, CartHandlers } from './Cart.models';
import { removeFromCart } from 'store/actions/cartActions';
import { RootState } from 'store/reducers';

import styles from './Cart.module.scss';

const Cart = ({ confirmRemoveItem = false }: CartProps) => {
  const items = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const cartHandler: CartHandlers = {};
  const [removeFromCartHandlers, setRemoveFromCartHandlers] = useState(
    cartHandler,
  );
  const [idToRemove, setIdToRemove] = useState('');

  const getRemoveFromCartHandler = (id: string) => {
    if (removeFromCartHandlers[id]) return removeFromCartHandlers[id];
    const newRemoveFromCartHandlers = { ...removeFromCartHandlers };
    newRemoveFromCartHandlers[id] = confirmRemoveItem
      ? () => setIdToRemove(id)
      : () => dispatch(removeFromCart(id));
    setRemoveFromCartHandlers(newRemoveFromCartHandlers);
    return newRemoveFromCartHandlers[id];
  };

  const handleYes = () => {
    dispatch(removeFromCart(idToRemove));
    setIdToRemove('');
  };

  const handleNo = () => setIdToRemove('');

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
      <div
        className={classnames(styles.confirmModal, {
          [styles.openConfirmModal]: idToRemove,
        })}
      >
        <h4>Remove Item?</h4>
        <div className={styles.buttonBar}>
          <Button clear ariaLabel="yes" click={handleYes}>
            Yes
          </Button>
          <Button adj ariaLabel="no" click={handleNo}>
            No
          </Button>
        </div>
      </div>
    </>
  );
};

export default Cart;
