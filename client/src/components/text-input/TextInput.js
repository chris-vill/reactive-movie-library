import React, { useState } from 'react';
import classNames from 'classnames';
import classes from './TextInput.sass';
import { isTypeOf } from '@core/utils';

const TextInput = ({ text, placeholder, name, type="text", value, onChange, onKeyDown, extClass="" }) => {
  const isObject = isTypeOf(value, 'object');
  const [ newVal, setInput ] = useState(
    isObject ? value[name] : value
  );

  function onInputChange({ target: { value } }) {
    setInput(value);
    onChange(prev => {
      if (isObject) {
        return {
          ...prev,
          [name]: value
        };
      }
      
      return value;
    });
  }

  return (
    <div className={ classNames(classes["text-input"], extClass) }>
      { text && <label htmlFor={ name }>{ text }:</label> }
      <input type={ type } id={ name } name={ name } value={ newVal } onChange={ onInputChange } placeholder={ placeholder } onKeyDown={ onKeyDown }></input>
    </div>
  );
}

export default TextInput;
