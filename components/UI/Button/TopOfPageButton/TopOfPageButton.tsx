import { FC } from 'react';
import clsx from 'clsx';

import Fa from 'components/UI/Fa/Fa';
import Button from 'components/UI/Button/Button';

import styles from './TopOfPageButton.module.scss';

interface TopOfPageButtonProps {
  isVisible: boolean;
  handleScrollToTop: () => void;
}

const TopOfPageButton: FC<TopOfPageButtonProps> = ({ isVisible, handleScrollToTop }) => {
  return (
    <div
      className={clsx(styles.BackToTopBtn, {
        [styles.OnScreenY]: isVisible,
      })}
    >
      <Button circle blueGray ariaLabel="Go To Top" click={handleScrollToTop}>
        <Fa white>fas fa-arrow-up</Fa>
      </Button>
    </div>
  );
};

export default TopOfPageButton;
