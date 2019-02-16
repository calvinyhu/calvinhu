import React from 'react';
import PropTypes from 'prop-types';

import styles from './Milestone.module.scss';

const milestone = props => {
  return (
    <div className={styles.Milestone}>
      <div className={styles.Photo}>
        <img src={props.photo} alt={props.alt} />
      </div>
      <div className={styles.Details}>
        <div>
          <h1 className={styles.Title}>{props.title}</h1>
          <p className={styles.Date}>{props.date}</p>
          <p>{props.description}</p>
          <a
            className={styles.Url}
            href={props.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {props.urlTitle}
          </a>
        </div>
      </div>
    </div>
  );
};

milestone.propTypes = {
  alt: PropTypes.string,
  date: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  photo: PropTypes.any.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  urlTitle: PropTypes.string.isRequired,
};

export default milestone;
