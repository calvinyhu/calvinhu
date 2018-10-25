import React from 'react';
import PropTypes from 'prop-types';

import styles from './Fa.module.scss';

const Fa = props => {
  let faClasses = styles.Fa + ' ' + props.children;

  if (props.lg) faClasses += ' fa-lg';
  if (props.twoX) faClasses += ' fa-2x';

  return <div className={faClasses} />;
};

Fa.propTypes = {
  children: PropTypes.string.isRequired,
  lg: PropTypes.bool,
  twoX: PropTypes.bool
};

export default Fa;
