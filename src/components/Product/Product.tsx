import React from 'react';

import Button from 'components/UI/Button/Button';
import { ProductProps } from './Product.models';

import styles from './Product.module.scss';

import photo from '../../assets/images/DSC_9569-1080p50-blurred.jpg';

const productParagraph =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type";

const Product = ({ addToCart }: ProductProps) => {
  return (
    <div className={styles.product}>
      <div className={styles.productPhoto}>
        <img src={photo} alt="Print Preview" />
      </div>
      <div className={styles.productDetails}>
        <div className={styles.text}>
          <h3>Lorem Ipsum is simply dummy text</h3>
          <p>{productParagraph}</p>
        </div>
        <div className={styles.cartSection}>
          <h4>$50</h4>
          <div className={styles.addToCartContainer}>
            <Button adj ariaLabel="Add To Cart" click={addToCart}>
              Add to cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;