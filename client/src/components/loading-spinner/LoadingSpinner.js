import React from 'react';
import classNames from 'classnames';
import classes from './LoadingSpinner.sass';

const LoadingSpinner = ({ text, onClick, extClass = "" }) => {

  return (
    <div className={ classNames(classes["loading-spinner"], extClass) }>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default LoadingSpinner;
