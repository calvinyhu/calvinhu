import React from 'react';
import classnames from 'classnames';

import Button from '../Button/Button';

import styles from './Modal.module.scss';
import Fa from '../Fa/Fa';

const Modal = ({
  cancelLabel,
  children,
  confirmLabel,
  handleCancel,
  handleConfirm,
  isOpen,
  title,
}) => {
  const modelClasses = classnames(styles.modal, { [styles.open]: isOpen });
  return (
    <div className={modelClasses}>
      <header>
        <h2>{title}</h2>
        <div className={styles.closeModalTimesButtonContainer}>
          <Button
            clear
            noBackground
            click={handleCancel}
            ariaLabel="Close Cart"
          >
            <Fa lg>fas fa-times</Fa>
          </Button>
        </div>
      </header>
      <div className={styles.modalContent}>{children}</div>
      <footer>
        <div className={styles.checkoutButtonContainer}>
          <Button adj click={handleConfirm} ariaLabel="Checkout">
            {confirmLabel}
          </Button>
        </div>
        <div className={styles.closeModalButtonContainer}>
          <Button link click={handleCancel} ariaLabel="Close Cart">
            {cancelLabel}
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default Modal;
