import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './Fa.module.scss';

const Fa = props => {
  const faClasses = classnames({
    [styles.Fa]: true,
    [props.children]: true,
    'fa-lg': props.lg,
    'fa-2x': props.twoX,
    'fa-3x': props.threeX,
    [styles.White]: props.white
  });

  return <div className={faClasses} />;
};

Fa.propTypes = {
  children: PropTypes.string.isRequired,
  lg: PropTypes.bool,
  twoX: PropTypes.bool
};

export default Fa;
