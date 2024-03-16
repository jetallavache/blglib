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

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  autoIndex: false, // Don't build indexes
  maxPoolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4 // Use IPv4, skip trying IPv6
}

mongoose
  .connect(url, options)
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


// if (process.env.ENV === 'production') {
//   const clientBuildPath = path.join(__dirname, 'app-main-page', 'build');
  // const adminDistPath = path.join(__dirname, 'admin', 'dist')

  // app.use(express.static(clientBuildPath));
  // app.use(express.static(adminDistPath))
  // app.use('/admin', (req, res) => {
  //   res.sendFile(join(adminDistPath, decodeURIComponent(req.url)))
  // })
// }

app.use('/welcome', index_router);
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
