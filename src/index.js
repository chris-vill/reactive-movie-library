import React from 'react';
import ReactDom from 'react-dom';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import './styles/main.sass';
import { Sample } from './components';

library.add(fab);
library.add(far);
library.add(fas);

ReactDom.render(
  (
    <Sample/>
  ),
  document.getElementById("root")
);
