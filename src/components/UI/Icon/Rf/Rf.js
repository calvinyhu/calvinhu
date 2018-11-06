// import React from 'react';
import PropTypes from 'prop-types';
// import classnames from 'classnames';

// import styles from './Rf.module.scss';

const Rf = props => {
  // const iconClasses = classnames({
  //   [styles.Icon]: true,
  //   [styles.Sm]: props.sm,
  //   [styles.Lg]: props.lg
  // });

  switch (props.children) {
    default:
      return null;
  }
};

Rf.propTypes = {
  children: PropTypes.string.isRequired,
  sm: PropTypes.bool,
  lg: PropTypes.bool
};

export default Rf;
