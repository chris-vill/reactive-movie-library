import React from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import './styles/main.sass';
import { Sample } from './components';

const API_KEY = 'd5000ed59b9ce514ef986b4cd8b1044d';

library.add(fab);
library.add(far);
library.add(fas);

// Sample call 
// Mad Max: Fury Road
axios.get(`https://api.themoviedb.org/3/movie/76341?api_key=${ API_KEY }`)
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

ReactDom.render(
  (
    <Sample/>
  ),
  document.getElementById("root")
);
