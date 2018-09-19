import React from 'react';

import classes from './Button.css';

const button = props => {
  let classNames = classes.Button;
  if (props.circle) classNames += ' ' + classes.Circle;
  if (props.adj) classNames += ' ' + classes.Adj;
  if (props.opp) classNames += ' ' + classes.Opp;

  return (
    <button className={classNames} onClick={props.click}>
      {props.children}
    </button>
  );
};

export default button;
