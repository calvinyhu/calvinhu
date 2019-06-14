import React from 'react';
// @ts-ignore
import { useSelector } from 'react-redux';

import Cart from 'components/Cart/Cart';

import styles from './Checkout.module.scss';

const Checkout = () => {
  // @ts-ignore
  const cartItems = useSelector(state => state.cart.items);

  return (
    <div className={styles.checkout}>
      <header>
        <h1>Your Cart</h1>
      </header>
      <div className={styles.checkoutInner}>
        <div className={styles.section}>
          <h2>Ship To</h2>
          <div>Address</div>
        </div>
        <div className={styles.section}>
          <h2>Payment</h2>
          <div>Credit Card</div>
          <div>Paypal</div>
        </div>
        <div className={styles.section}>
          <h2>Order Details</h2>
          <Cart />
        </div>
        <div className={styles.section}>
          <h2>Shipping Method</h2>
          <div>Standard</div>
          <div>Expedited</div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
