import React, { useState } from 'react';
// @ts-ignore
import { useDispatch, useSelector } from 'react-redux';
import classnames from 'classnames';

import { CartProps } from './Cart.model';
import CartItem from '../CartItem/CartItem';
import { removeFromCart } from '../../store/actions/cartActions';

import styles from './Cart.module.scss';
import Button from 'components/UI/Button/Button';

type cartHandler = () => void;
interface cartHandlers {
  [key: string]: cartHandler;
}

const Cart = ({ confirmRemoveItem = false }: CartProps) => {
  // @ts-ignore
  const items = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const [removeFromCartHandlers, setRemoveFromCartHandlers] = useState(
    {} as cartHandlers,
  );
  const [idToRemove, setIdToRemove] = useState('');

  const getRemoveFromCartHandler = (id: string) => {
    if (removeFromCartHandlers[id]) return removeFromCartHandlers[id];
    const newRemoveFromCartHandlers = { ...removeFromCartHandlers };
    if (confirmRemoveItem)
      newRemoveFromCartHandlers[id] = () => setIdToRemove(id);
    else newRemoveFromCartHandlers[id] = () => dispatch(removeFromCart(id));
    setRemoveFromCartHandlers(newRemoveFromCartHandlers);
    return removeFromCartHandlers[id];
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
