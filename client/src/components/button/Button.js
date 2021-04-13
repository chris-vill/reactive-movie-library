import React from 'react';
import classNames from 'classnames';
import classes from './Button.sass';

const Button = ({ text, onClick, extClass = "" }) => {

  return (
    <button
      className={ classNames(classes["button"], extClass) }
      onClick={ onClick }
    >
      { text }
    </button>
  );
}

export default Button;
