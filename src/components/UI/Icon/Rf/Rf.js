import React from 'react';
import PropTypes from 'prop-types';
import ArrowUp from 'react-feather/dist/icons/arrow-up';
import Download from 'react-feather/dist/icons/download';
import Github from 'react-feather/dist/icons/github';
import Image from 'react-feather/dist/icons/image';
import Linkedin from 'react-feather/dist/icons/linkedin';

import styles from './Rf.module.scss';

const Rf = props => {
  let iconClasses = styles.Icon;

  if (props.sm) iconClasses += ' ' + styles.Sm;
  if (props.lg) iconClasses += ' ' + styles.Lg;

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
  children: PropTypes.string.isRequired
};

export default Rf;
