import React from 'react';

import Button from '../UI/Button/Button';
import { useResetScrollOnUnmount } from '../../utils/hooks';

import styles from './OrderItem.module.scss';

import photo from '../../assets/images/DSC_9569-1080p50-blurred.jpg';

const OrderItem = () => {
  useResetScrollOnUnmount();

  const handleAddToCard = () => {};

  return (
    <div className={styles.orderItem}>
      <div className={styles.orderItemPhoto}>
        <img src={photo} alt="Print Preview" />
      </div>
      <div className={styles.orderItemDetails}>
        <div className={styles.text}>
          <h3>Lorem Ipsum is simply dummy text</h3>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
          </p>
        </div>
        <div className={styles.cartSection}>
          <h4>$50</h4>
          <div className={styles.addToCartContainer}>
            <Button adj ariaLabel="Add To Cart" click={handleAddToCard}>
              Add to cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
