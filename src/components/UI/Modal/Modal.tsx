import React from 'react';
import clsx from 'clsx';

import Button from '../Button/Button';

import styles from './Modal.module.scss';
import Fa from '../Fa/Fa';

interface ModalProps {
  cancelLabel: string;
  // eslint-disable-next-line
  children: any;
  confirmDisabled: boolean;
  confirmLabel: string;
  // eslint-disable-next-line
  handleCancel: any;
  // eslint-disable-next-line
  handleConfirm: any;
  isOpen: boolean;
  title: string;
}

const Modal = ({
  cancelLabel,
  children,
  confirmDisabled,
  confirmLabel,
  handleCancel,
  handleConfirm,
  isOpen,
  title,
}: ModalProps) => {
  const modelClasses = clsx(styles.modal, { [styles.open]: isOpen });
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
          <Button
            adj
            click={handleConfirm}
            ariaLabel="Checkout"
            disabled={confirmDisabled}
          >
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
