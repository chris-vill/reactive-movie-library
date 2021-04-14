import React from 'react';
import { withRouter } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from 'classnames';
import classes from './Icon.sass';

library.add(fab);
library.add(far);
library.add(fas);

const Icon = ({ iconCode, onClick, extClass = "" }) => {

  return (
    <div className={ classNames(classes["icon"], extClass) } onClick={ onClick }>
      <FontAwesomeIcon icon={ iconCode }/>
    </div>
  );
}

export default withRouter(Icon);
