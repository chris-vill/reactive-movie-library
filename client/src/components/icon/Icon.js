import React from 'react';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core';
// import { fab } from '@fortawesome/free-brands-svg-icons';
import {
  faHeart as farHeart,
} from '@fortawesome/free-regular-svg-icons';
import {
  faDoorOpen as fasDoorOpen,
  faSort as farSort,
  faSortUp as farSortUp,
  faSortDown as farSortDown,
  faHeart as fasHeart,
  faFilter as fasFilter
} from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import classes from './Icon.sass';

library.add(farHeart, fasHeart, fasDoorOpen, farSort, farSortUp, farSortDown, fasFilter);

const Icon = ({ text, icon, onClick, onMouseEnter, onMouseLeave, extClass = "" }) => {

  return (
    <div className={ classNames(classes["icon"], extClass) } onMouseEnter={ onMouseEnter } onMouseLeave={ onMouseLeave } onClick={ onClick }>
      <FontAwesomeIcon icon={ getIconCode(icon) }/>
      { text && <span>{ text }</span> }
    </div>
  );
}

function getIconCode(icon) {
  return icon
    .split(/-(.+)/)
    .splice(0,2);
}

export default withRouter(Icon);
