import React from 'react';
import classes from './Sample.sass';

const Sample = ({ name, extClass = "" }) => {

  return (
    <div className={ `${ classes["sample"] } ${ extClass }` }>
      React App ft. Yeoman
    </div>
  );
}

export default Sample;
