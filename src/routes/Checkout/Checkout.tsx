import React from 'react';
// @ts-ignore
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Cart from 'components/Cart/Cart';

import styles from './Checkout.module.scss';

const Checkout = () => {
  // @ts-ignore
  const items = useSelector(state => state.cart.items);

  const renderNothingInCart = () => (
    <div className={styles.section}>
      <h2>No items in your cart.</h2>
      <Link to="/order">Order prints.</Link>
    </div>
  );

  const renderCheckout = () => (
    <>
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
        <Cart confirmRemoveItem />
      </div>
      <div className={styles.section}>
        <h2>Shipping Method</h2>
        <div>Standard</div>
        <div>Expedited</div>
      </div>
    </>
  );

  return (
    <div className={styles.checkout}>
      <header>
        <h1>Your Cart</h1>
      </header>
      <div className={styles.checkoutInner}>
        {Object.keys(items).length ? renderCheckout() : renderNothingInCart()}
      </div>
    </div>
  );
};

export default Checkout;
