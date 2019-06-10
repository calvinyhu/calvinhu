import React from 'react';

import OrderItem from '../../components/OrderItem/OrderItem';
import Button from '../../components/UI/Button/Button';
import Fa from '../../components/UI/Fa/Fa';

import styles from './Order.module.scss';

const Order = () => {
  const handleCartClick = () => {};
  return (
    <div className={styles.order}>
      <header>
        <h1>Order Prints</h1>
        <div className={styles.cart}>
          <div className={styles.cartButtonContainer}>
            <Button
              link
              noBackground
              ariaLabel="View Cart"
              click={handleCartClick}
            >
              <Fa>fas fa-shopping-cart</Fa>
              <p>0</p>
            </Button>
          </div>
        </div>
      </header>
      <div className={styles.orderItems}>
        <OrderItem />
        <OrderItem />
        <OrderItem />
      </div>
    </div>
  );
};

export default Order;
