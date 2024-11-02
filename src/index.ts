import url from 'node:url';
import { createRequire } from 'module';
import { join } from 'node:path';
import express from "express";
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from "dotenv";
import hbs from 'hbs';
import lessMiddleware from 'less-middleware';
import session from 'express-session';

const requireCJS = createRequire(url.pathToFileURL(__filename));
const hbsutils = requireCJS('hbs-utils')(hbs);

import dataSource from './config/data-source';
import passport from './config/passport';
import indexRoute from './routes/index';
import gameRoute from './routes/game';
import apiV1Route from './routes/apiv1';

dotenv.config();
const app = express();
export const port = process.env.PORT || 4000;
const whitelist = process.env.CLIENT_URL ? process.env.CLIENT_URL.split(',') :
  ['http://localhost:3000', 'http://localhost:4000'];

const corsOptions = {
  credentials: true,
  origin: function (origin: any, callback: any) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  optionsSuccessStatus: 200
}

hbs.registerPartials(join(__dirname, 'views', 'layouts'), function () { });
hbsutils.registerWatchedPartials(join(__dirname, 'views', 'layouts'));
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(lessMiddleware(join(__dirname, 'public')));
app.use(express.static(join(__dirname, 'public')));
app.use(cookieParser('FE28D342-4040-4D0E-B080-B85E85DAF7FD'));
app.use(session({
  secret: 'BD564488-5105-4202-8927-5A5C9AE9154E',
  resave: false,
  saveUninitialized: false
}));

// register regenerate & save after the cookieSession middleware initialization
// this method can be used together with cookie-parser and express-session.
app.use((req, res, next) => {
  if (req.session && !req.session.regenerate) {
    req.session.regenerate = (cb: any) => {
      cb();
    }
  }
  if (req.session && !req.session.save) {
    req.session.save = (cb: any) => {
      cb();
    }
  }
  next();
});

app.use(passport.initialize());
app.use(passport.session());

// This is a middleware function which is used to make our Handlebars's views,
// can access to the sessions during that request/response cycle.
app.use(function (req: any, res: any, next: any) {
  res.locals.session = req.session;
  const flashErrors: string[] = req.session.flashErrors;
  if (flashErrors) {
    res.locals.flashErrors = flashErrors;
    req.session.flashErrors = null;
  }
  next();
});

app.use('/', indexRoute);
app.use('/game', gameRoute);
app.use('/api/v1', (req, res, next) => {
  if (req.session.user) {
    return next();
  }
  else {
    res.status(401).end();
  }
});
app.use('/api/v1', apiV1Route);
app.use('/tictactoe', (req, res, next) => {
  if (req.session.user) {
    return next();
  }
  else {
    res.status(401).end();
  }
});
app.use('/tictactoe', express.static(join(__dirname, 'tictactoe')));
app.use('/tictactoe/js', express.static(join(__dirname, 'tictactoe', 'javascripts')));
app.use('/tictactoe/images', express.static(join(__dirname, 'tictactoe', 'images')));
app.use('/tictactoe/static/js', express.static(join(__dirname, 'tictactoe', 'static', 'javascripts')));
app.use('/tictactoe/static/css', express.static(join(__dirname, 'tictactoe', 'static', 'stylesheets')));
app.use('/tictactoe/static/media', express.static(join(__dirname, 'tictactoe', 'static', 'media')));

// Auth
app.get('/auth', passport.authenticate('google', {
  scope:
    ['email', 'profile']
}));

// Auth Callback
app.get('/auth/callback',
  passport.authenticate('google', {
    successRedirect: '/auth/callback/success',
    failureRedirect: '/auth/callback/failure'
  })
);

// Success
app.get('/auth/callback/success', (req, res) => {
  if (!req.user) {
    return res.redirect('/auth/callback/failure');
  }
  req.session.user = req.user;
  req.session.playHistory = null;
  res.redirect('/game');
  //console.log('user =', req.user);
  //res.send("Welcome " + req.user.email);
});

// Failure
app.get('/auth/callback/failure', (req, res) => {
  res.redirect('/');
})

// Logout
app.get('/auth/logout', (req, res) => {
  if (req.session && req.session.user) {
    req.session.user = null;
    req.session.playHistory = null;
    res.clearCookie('connect.sid');
    req.session.destroy((err) => { if (err) { console.error(err); } });
  }
  res.redirect('/');
})

let server: any = null;

export const boot = async () => {
  await dataSource.initialize();
  console.log('Datasource is initialized');
  server = app.listen(port, () => {
    console.log(`Express Server is running at http://localhost:${port}`);
  });
};

export const shutdown = async () => {
  if (server) {
    console.log('Shutting down Express Server');
    server.close();
    console.log('Express Server is closed');
  }
  if (dataSource.isInitialized) {
    console.log('Shutting down Datasource');
    await dataSource.destroy();
    console.log('Datasource is closed');
  }
  // Comment while testing with Jest
  process.exit();
};

if (require.main === module) {
  boot();
}
else {
  console.log('Running app as a module');
}

// listen for TERM signal .e.g. kill
process.on('SIGTERM', shutdown);
// listen for INT signal e.g. Ctrl-C
process.on('SIGINT', shutdown);