import React from 'react';

import styles from './CartItem.module.scss';
import Button from '../UI/Button/Button';
import Fa from '../UI/Fa/Fa';

import src from '../../assets/images/DSC_9569-1080p50-blurred.jpg';

const CartItem = ({ name, handleRemoveItem, price }) => {
  return (
    <div className={styles.cartItem}>
      <div className={styles.details}>
        <div className={styles.photo}>
          <img src={src} alt="Item Preview" />
        </div>
        <p>{name}</p>
      </div>
      <div className={styles.price}>
        <p>{price}</p>
        <div className={styles.removeItemContainer}>
          <Button
            circle
            clear
            noBackground
            click={handleRemoveItem}
            ariaLabel="Remove Item"
          >
            <Fa>fas fa-times</Fa>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
