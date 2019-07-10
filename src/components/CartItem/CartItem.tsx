import React from 'react';

import { CartItemProps } from './CartItem.models';
import Button from '../UI/Button/Button';
import Fa from '../UI/Fa/Fa';

import styles from './CartItem.module.scss';

import src from '../../assets/images/DSC_9569-1080p50-blurred.jpg';

const CartItem = ({ handleRemoveItem, name, price }: CartItemProps) => (
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
          ariaLabel="Remove Item"
          circle
          clear
          click={handleRemoveItem}
          noBackground
        >
          <Fa>fas fa-times</Fa>
        </Button>
      </div>
    </div>
  </div>
);

export default CartItem;
