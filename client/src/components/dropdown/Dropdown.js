import React from 'react';
import classNames from 'classnames';
import classes from './Dropdown.sass';
import { Icon } from '@components';

const Dropdown = ({ icon, extClass = "" }) => {

  return (
    <div className={ classNames(classes["dropdown"], extClass) }>
      <Icon icon={ icon }/>
      <ul>
        <li>hello</li>
      </ul>
    </div>
  );
}

export default Dropdown;
