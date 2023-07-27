const dotenv = require('dotenv').config({ path: './config.env' });
process.on('uncaughtException', err => {
  console.log(err.name, err.message);
  console.log('Uncaught Exception! Shutting Down...');

  process.exit(1);
});

const mongoose = require('mongoose');
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB)
  .then(() => console.log('Connection with Database made successfully.'))
  .catch(err => {
    console.log('Error connecting to Database!\n', err);

    throw new Error(err);
  });

const port = process.env.PORT || 8000;
const server = app.listen(port, () =>
  console.log(`Listening to port ${port}...`)
);

process.on('unhandledRejection', err => {
  console.log(err.name, err.message);
  console.log('Unhandled Rejection! Shutting Down...');

  server.close(() => {
    process.exit(1);
  });
});
