import React from 'react';
import ReactDom from 'react-dom';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { Sample } from '@components';
import TMDB from '@core/tmdb';
import '@styles/reset.sass';
import '@styles/main.sass';

library.add(fab);
library.add(far);
library.add(fas);

// Sample call 
// Mad Max: Fury Road
TMDB.get('movie/76341')
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

/*
  Required
  - Login
  - Popular movies on home page
  - Move cards (name, poster image, release date, popRating)
  - Load more on scroll
  - Responsive design (desktop, mobile, tablet)
  - Filter (year, genre)
  - Search
  - Sorting
  - Movie View (all details)
  - Favorite list
  - Spinner
  
  Nice To Have
    - Heroku
    - Jest
*/