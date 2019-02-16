import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Menu from 'react-feather/dist/icons/menu';

import styles from './Rf.module.scss';

const Rf = props => {
  Rf.propTypes = {
    children: PropTypes.string.isRequired,
    sm: PropTypes.bool,
    lg: PropTypes.bool,
  };

  const iconClasses = classnames({
    [styles.Icon]: true,
    [styles.Sm]: props.sm,
    [styles.Lg]: props.lg,
  });

  switch (props.children) {
    case 'menu':
      return <Menu className={iconClasses} />;
    default:
      return null;
  }
};

export default Rf;
