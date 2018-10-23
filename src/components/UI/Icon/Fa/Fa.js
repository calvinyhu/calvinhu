import React from 'react';
import PropTypes from 'prop-types';

import styles from './Fa.module.css';

const Fa = props => {
  let faClasses = styles.Fa + ' ' + props.children;

  if (props.lg) faClasses += ' fa-lg';
  if (props.twoX) faClasses += ' fa-2x';

  return <div className={faClasses} />;
};

Fa.propTypes = {
  bare: PropTypes.bool,
  lg: PropTypes.bool,
  children: PropTypes.string.isRequired
};

export default Fa;
