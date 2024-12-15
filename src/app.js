const express = require('express');
const app = express();
require('dotenv').config();
const path = require('path');
const helmet = require('helmet');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const db = require('./config/db');
const PORT = 4000;

const cleanRequestBody = require('./middlewares/cleanRequestBody');
const { toUrlString } = require('./utils/urlFormatter');
const adminRouter = require('./routes/adminRouter');
const siteRouter = require('./routes/siteRouter');
const userDataRouter = require('./routes/userDataRouter');
const userRouter = require('./routes/userRouter');
const bookRouter = require('./routes/bookRouter');

const csp = {
  directives: {
    defaultSrc: ["'self'"],
    connectSrc: ["'self'", 'https:', 'www.google.com', 'www.recaptcha.net'],
    styleSrc: ["'self'", "'unsafe-inline'", 'fonts.googleapis.com'],
    scriptSrc: ["'self'", "'unsafe-inline'", 'www.google.com', 'www.gstatic.com', 'www.googletagmanager.com'],
    imgSrc: ["'self'", 'www.gstatic.com', 'www.google.com', 'www.w3.org', 'data:'],
    frameSrc: ["'self'", 'www.google.com', 'www.recaptcha.net'],
    upgradeInsecureRequests: [], // HTTP'yi HTTPS'ye yükselt
  },
};

app.set('trust proxy', true);

app.use(helmet());
app.use(helmet.contentSecurityPolicy(csp)); // Özelleştirilmiş CSP'yi uyguluyoruz

app.use(express.static(path.join(__dirname, './public')));
app.use(expressLayouts);
app.set('layout', path.join(__dirname, 'views', 'layouts', 'layout.ejs'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

const sessionStore = new MySQLStore({}, db);

app.use(
  session({
    key: 'session_id.book.ekinn.site',
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore, // MySQL Store'u burada belirtiyoruz
    cookie: {
      secure: true,
      httpOnly: true,
      sameSite: 'Lax', // Cross-site isteklerinde cookie gönderilir
      maxAge: 1000 * 60 * 60 * 12, // 12 saat (milisaniye cinsinden)
    },
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cleanRequestBody);

app.use((req, res, next) => {
  app.locals.toUrlString = toUrlString;
  res.locals.isAuthenticated = req.session?.isAuthenticated || false;
  res.locals.userId = req.session?.userId || null;
  res.locals.userRole = req.session?.role || null;
  res.locals.userFirstname = req.session?.userName || '';
  res.locals.avatar = req.session?.avatar || '0';
  next();
});

app.use(adminRouter);
app.use(siteRouter);
app.use(userDataRouter);
app.use(userRouter);
app.use(bookRouter);

app.use((req, res, next) => {
  res.status(404).render('error/error.ejs', { title: '404', statusCode: '404', message: 'Sayfa Bulunamadı' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);

  if (process.env.NODE_ENV === 'development') {
    res.status(500).send(`Something went wrong! ${err.stack}`);
  } else {
    res.status(500).render('error/error.ejs', { title: '500', statusCode: '500', message: 'Sunucu Hatası' });
  }
});

app.listen(PORT, () => {});
