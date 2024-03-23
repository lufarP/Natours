const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

const uri = process.env.DATABASE_URI;
const { DATABASE_APP_NAME, DATABASE_USER, DATABASE_PASS } = process.env;
mongoose
  .connect(uri, {
    appName: DATABASE_APP_NAME,
    user: DATABASE_USER,
    pass: DATABASE_PASS,
    autoIndex: false
  })
  .then(() => console.log('DB connection successful!'));

const port = process.env.port || 3000;
const hostname = process.env.hostname || '127.0.0.1';
const server = app.listen(port, hostname, () => {
  console.log(`App running on port ${hostname}:${port}...`);
});

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
