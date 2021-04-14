import React from 'react';
import classNames from 'classnames';
import classes from './TextInput.sass';

const TextInput = ({ text, placeholder, name, type="text", value, onChange, onKeyDown, extClass="" }) => {

  return (
    <div className={ classNames(classes["text-input"], extClass) }>
      { text && <label htmlFor={ name }>{ text }:</label> }
      <input type={ type } id={ name } name={ name } value={ value } onChange={ onChange } placeholder={ placeholder } onKeyDown={ onKeyDown }></input>
    </div>
  );
}

export default TextInput;
