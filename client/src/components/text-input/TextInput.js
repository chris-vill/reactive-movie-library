import React from 'react';
import classNames from 'classnames';
import classes from './TextInput.sass';

const TextInpupt = ({ text, name, type="text", value, onChange, extClass="" }) => {

  return (
    <div className={ classNames(classes["text-input"], extClass) }>
      <label htmlFor={ name }>{ text }:</label>
      <input type={ type } id={ name } name={ name } value={ value } onChange={ onChange }></input>
    </div>
  );
}

export default TextInpupt;
