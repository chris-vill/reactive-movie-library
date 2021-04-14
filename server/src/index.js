const Express = require('express');
const CONSTANTS = require('./core/constants.js');
const path = require('path');

const paths = {
  client: pathResolve('../../client/dist')
}

Express()
  .use(Express.static(paths.client))
  .set('views', paths.client)
  .engine('html', require('ejs').renderFile)
  .set('view engine', 'html')
  .get('/', (req, res) => res.render('index.html'))
  .get('/login', (req, res) => res.redirect('/'))
  .get('/home', (req, res) => res.redirect('/'))
  .get('/movie/*', (req, res) => res.redirect('/'))
  .listen(CONSTANTS.PORT, () => {
    console.log(`Server is running on localhost:${ CONSTANTS.PORT }...`);
  });

function pathResolve(dir) {
  return path.resolve(__dirname, dir);
}
