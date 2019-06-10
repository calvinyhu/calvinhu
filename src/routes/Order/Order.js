import React, { useState } from 'react';
import classnames from 'classnames';

import OrderItem from '../../components/OrderItem/OrderItem';
import Button from '../../components/UI/Button/Button';
import Fa from '../../components/UI/Fa/Fa';
import Modal from '../../components/UI/Modal/Modal';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
import { useResetScrollOnUnmount } from '../../utils/hooks';

import styles from './Order.module.scss';
import CartItem from '../../components/CartItem/CartItem';

const Order = () => {
  useResetScrollOnUnmount();

  const [cartOpen, setCartOpen] = useState(false);

  const cartClickHandlers = {};
  const getCartClickHandler = isOpen => {
    if (cartClickHandlers[isOpen]) return cartClickHandlers[isOpen];
    cartClickHandlers[isOpen] = () => setCartOpen(isOpen);
    return cartClickHandlers[isOpen];
  };

  const renderCart = () => {
    const cart = [
      {
        description: 'Item Name',
        price: '$30',
      },
      {
        description: 'Item Name',
        price: '$30',
      },
      {
        description: 'Item Name',
        price: '$30',
      },
      {
        description: 'Item Name',
        price: '$30',
      },
      {
        description: 'Item Name',
        price: '$30',
      },
    ];
    return cart.map(item => (
      <CartItem description={item.description} price={item.price} />
    ));
  };

  return (
    <div
      className={classnames(styles.order, { [styles.stopScroll]: cartOpen })}
    >
      <header>
        <h1>Order Prints</h1>
        <div className={styles.cart}>
          <div className={styles.cartButtonContainer}>
            <Button
              link
              noBackground
              ariaLabel="View Cart"
              click={getCartClickHandler(true)}
            >
              <Fa>fas fa-shopping-cart</Fa>
              <p>0</p>
            </Button>
          </div>
        </div>
      </header>
      <div className={styles.orderItems}>
        <OrderItem addToCart={() => {}} />
        <OrderItem addToCart={() => {}} />
        <OrderItem addToCart={() => {}} />
      </div>
      <Modal
        cancelLabel="Close"
        confirmLabel="Checkout"
        handleCancel={getCartClickHandler(false)}
        handleConfirm={getCartClickHandler(false)}
        isOpen={cartOpen}
        render={renderCart}
        title="Cart"
      />
      <Backdrop isOpen={cartOpen} click={getCartClickHandler(false)} />
    </div>
  );
};

export default Order;
