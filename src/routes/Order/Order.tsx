import React, { useState } from 'react';
import classnames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import uniqid from 'uniqid';

import { CartItem, OrderProps, ProductItem } from './Order.models';
import { products } from './Order.fixtures';
import Product from 'components/Product/Product';
import Button from 'components/UI/Button/Button';
import Fa from 'components/UI/Fa/Fa';
import Modal from 'components/UI/Modal/Modal';
import Backdrop from 'components/UI/Backdrop/Backdrop';
import Cart from 'components/Cart/Cart';
import { useResetScrollOnUnmount } from 'utils/hooks';
import { addToCart } from 'store/actions/cartActions';
import { RootState } from 'store/reducers';

import styles from './Order.module.scss';

const addToCartHandlers: any = {};

const Order = ({ history }: OrderProps) => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
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
      const product: ProductItem = {
        name: products[id].name,
        price: products[id].price,
      };
      const cartItem: CartItem = { [uniqid()]: product };
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
      <header className={styles.orderHeader}>
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
        confirmLabel="Begin Checkout"
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
