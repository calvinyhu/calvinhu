import React, { useState } from 'react';
import classnames from 'classnames';
import { useDispatch } from 'react-redux';
import uniqid from 'uniqid';

import Product from '../../components/Product/Product';
import Button from '../../components/UI/Button/Button';
import Fa from '../../components/UI/Fa/Fa';
import Modal from '../../components/UI/Modal/Modal';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
import Cart from '../../components/Cart/Cart';
import { useResetScrollOnUnmount } from '../../utils/hooks';
import { addToCart } from '../../store/actions/cartActions';

import styles from './Order.module.scss';

const products = {
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

const addToCartHandlers = {};
const cartClickHandlers = {};

const Order = () => {
  const [cartOpen, setCartOpen] = useState(false);
  useResetScrollOnUnmount();
  const dispatch = useDispatch();

  const getCartClickHandler = isOpen => {
    if (cartClickHandlers[isOpen]) return cartClickHandlers[isOpen];
    cartClickHandlers[isOpen] = () => setCartOpen(isOpen);
    return cartClickHandlers[isOpen];
  };

  const getAddToCartHandler = id => {
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

  // const renderCart = () => <Cart />;

  const orderClasses = classnames({
    [styles.order]: true,
    [styles.stopScroll]: cartOpen,
  });

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
              click={getCartClickHandler(true)}
            >
              <Fa>fas fa-shopping-cart</Fa>
              <p>0</p>
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
        handleCancel={getCartClickHandler(false)}
        handleConfirm={getCartClickHandler(false)}
        isOpen={cartOpen}
        title="Cart"
      >
        <Cart />
      </Modal>
      <Backdrop isOpen={cartOpen} click={getCartClickHandler(false)} />
    </div>
  );
};

export default Order;
