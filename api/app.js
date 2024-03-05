import createError from 'http-errors';
import express from 'express';
import 'dotenv/config.js';
import path from 'path';
import { fileURLToPath } from "url";
import logger from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';

import { index_router } from './routes/index.router.js';
import { auth_router } from './routes/auth.router.js';
import { control_router } from './routes/control.router.js';

const app = express();

mongoose.connect(process.env.MONGODB_URL || 'mongodb://127.0.0.1/blglib');
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(logger('dev'));
app.use(express.json({ limit: "1kb" }));
app.use(express.urlencoded({extended: false, limit: "1kb"}));
// app.use(express.multipart({ limit: "10mb" }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', index_router);
app.use('/auth', auth_router);
app.use('/control', control_router);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

export { app as default };
