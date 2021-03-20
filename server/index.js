const express = require('express');
//initialize app
const app = express();
//require morgan|volleyball, path packages
const morgan = require('morgan');
const path = require('path');
//require db from /db
const {
  db,
  syncAndSeed,
  models: { Campus },
} = require('./db');

//use morgan|volleyball
app.use(morgan('dev'));
//use express.json()
app.use(express.json());

//use express.static() MAKE SURE THE PATH TO YOUR PUBLIC FOLDER IS RIGHT!
app.use('/public', express.static(path.join(__dirname, 'public')));

//require in your routes and use them on your api path
app.use('/api', router);
//404 handler
app.use((err, req, res, next) => {
  res.status(404).send('404: Page Not Found');
});
//500 handler
app.use((err, req, res, next) => {
  res.status(500).send({ error: err });
});

const init = async () => {
  try {
    await syncAndSeed();
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`listening on PORT: ${port}`));
  } catch (error) {
    console.log(error);
  }
};

init();
