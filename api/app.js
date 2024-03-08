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

import { url } from './conf/db.conf.js'

const app = express();

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database saccessful");
  })
  .catch(err => {
    console.log("MongoDB connection error: ", err);
    process.exit();
  });

app.use(logger('dev'));
app.use(express.json({ limit: "1kb" }));
app.use(express.urlencoded({extended: false, limit: "1kb"}));
// app.use(express.multipart({ limit: "10mb" }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());


if (process.env.ENV === 'production') {
  const clientBuildPath = path.join(__dirname, 'app-main-page', 'build');
  // const adminDistPath = path.join(__dirname, 'admin', 'dist')

  app.use(express.static(clientBuildPath));
  // app.use(express.static(adminDistPath))
  // app.use('/admin', (req, res) => {
  //   res.sendFile(join(adminDistPath, decodeURIComponent(req.url)))
  // })
}

app.use('/api', index_router);
app.use('/api/auth', auth_router);
app.use('/api/control', control_router);

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
