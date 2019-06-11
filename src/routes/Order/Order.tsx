import React, { useState } from 'react';
import classnames from 'classnames';
// @ts-ignore
import { useDispatch, useSelector } from 'react-redux';
import uniqid from 'uniqid';

import { OrderProps } from './Order.models';
import Product from 'components/Product/Product';
import Button from 'components/UI/Button/Button';
import Fa from 'components/UI/Fa/Fa';
import Modal from 'components/UI/Modal/Modal';
import Backdrop from 'components/UI/Backdrop/Backdrop';
import Cart from 'components/Cart/Cart';
import { useResetScrollOnUnmount } from 'utils/hooks';
import { addToCart } from 'store/actions/cartActions';

import styles from './Order.module.scss';

const products: any = {
  1: {
    name: 'Item Name 1',
    price: 30,
  },
  2: {
    name: 'Item Name 2',
    price: 40,
  },
  3: {
    name: 'Item Name 3',
    price: 50,
  },
};

const addToCartHandlers: any = {};

const Order = ({ history }: OrderProps) => {
  const cartItems = useSelector((state: any) => state.cart.items);
  const [cartOpen, setCartOpen] = useState(false);
  useResetScrollOnUnmount();
  const dispatch = useDispatch();

  const handleCartOpen = () => setCartOpen(true);
  const handleCartClose = () => setCartOpen(false);
  const handleCheckout = () => history.push('/checkout');

  const getAddToCartHandler = (id: string) => {
    if (addToCartHandlers[id]) {
      return addToCartHandlers[id];
    }
    addToCartHandlers[id] = () => {
      const product = { name: products[id].name, price: products[id].price };
      const cartItem = { [uniqid()]: product };
      dispatch(addToCart(cartItem));
    };
    return addToCartHandlers[id];
  };

  const orderClasses = classnames({
    [styles.order]: true,
    [styles.stopScroll]: cartOpen,
  });

  const cartLength = Object.keys(cartItems).length;

  return (
    <div className={orderClasses}>
      <header>
        <h1>Order Prints</h1>
        <div className={styles.cart}>
          <div className={styles.cartButtonContainer}>
            <Button
              link
              noBackground
              ariaLabel="View Cart"
              click={handleCartOpen}
            >
              <Fa>fas fa-shopping-cart</Fa>
              <p>{cartLength}</p>
            </Button>
          </div>
        </div>
      </header>
      <div className={styles.products}>
        {Object.keys(products).map(id => (
          <Product key={id} addToCart={getAddToCartHandler(id)} />
        ))}
      </div>
      <Modal
        cancelLabel="Close"
        confirmLabel="Checkout"
        confirmDisabled={cartLength === 0}
        handleCancel={handleCartClose}
        handleConfirm={handleCheckout}
        isOpen={cartOpen}
        title="Cart"
      >
        <Cart />
      </Modal>
      <Backdrop isOpen={cartOpen} click={handleCartClose} />
    </div>
  );
};

export default Order;
