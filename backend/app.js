import createError from 'http-errors';
import express from 'express';
import path from 'path';
import { fileURLToPath } from "url";
import logger from 'morgan';
import mongoose from 'mongoose';

import { index_router } from './routes/index.router.js';
import { auth_router } from './routes/auth.router.js';
import { control_router } from './routes/control.router.js';

const app = express();

// connecting to the databese
const mongoDB = 'mongodb://127.0.0.1/blglib';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index_router);
app.use('/auth', auth_router);
app.use('/control', control_router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// module.exports = app;
export { app as default };

