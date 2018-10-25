import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ArrowUp from 'react-feather/dist/icons/arrow-up';
import Download from 'react-feather/dist/icons/download';
import Github from 'react-feather/dist/icons/github';
import Image from 'react-feather/dist/icons/image';
import Linkedin from 'react-feather/dist/icons/linkedin';

import styles from './Rf.module.scss';

const Rf = props => {
  const iconClasses = classnames({
    [styles.Icon]: true,
    [styles.Sm]: props.sm,
    [styles.Lg]: props.lg
  });

  switch (props.children) {
    case 'arrow-up':
      return <ArrowUp className={iconClasses} />;
    case 'download':
      return <Download className={iconClasses} />;
    case 'github':
      return <Github className={iconClasses} />;
    case 'image':
      return <Image className={iconClasses} />;
    case 'linkedin':
      return <Linkedin className={iconClasses} />;
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
