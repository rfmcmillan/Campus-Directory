const express = require('express');
const app = express();

const morgan = require('morgan');
const path = require('path');

const { db, syncAndSeed } = require('./db');

app.use(morgan('dev'));
app.use('/dist', express.static(path.join(__dirname, '../dist')));
app.use(express.json());

const router = require('./routes');

//use express.static() MAKE SURE THE PATH TO YOUR PUBLIC FOLDER IS RIGHT!
app.use('/public', express.static(path.join(__dirname, 'public')));

//require in your routes and use them on your api path

app.get('/', (req, res, next) =>
  res.sendFile(path.join(__dirname, '../index.html'))
);

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

module.exports = app;
