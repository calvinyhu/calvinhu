import React from 'react';

import styles from './CartItem.module.scss';
import Button from '../UI/Button/Button';
import Fa from '../UI/Fa/Fa';

import src from '../../assets/images/DSC_9569-1080p50-blurred.jpg';

interface CartItemProps {
  handleRemoveItem: any;
  name: any;
  price: any;
}

const CartItem = ({ handleRemoveItem, name, price }: CartItemProps) => {
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
};

export default CartItem;
