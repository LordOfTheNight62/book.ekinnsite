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
const adminRouter = require('./routes/adminRouter');
const userRouter = require('./routes/userRouter');
const bookRouter = require('./routes/bookRouter');

const csp = {
  directives: {
    defaultSrc: ["'self'"], // Yalnızca kendi domain'den içerik al
    connectSrc: ["'self'", 'https:'], // HTTPS'yi ekleyin
    scriptSrc: ["'self'", "'unsafe-inline'"], // Inline script'lere izin ver
    styleSrc: ["'self'", "'unsafe-inline'"], // Inline stil etiketlerine izin ver
    scriptSrcAttr: ["'self'", "'unsafe-inline'"], // Inline event handler'lara izin ver
  },
};

app.set('trust proxy', true);

app.use(helmet());
app.use(helmet.contentSecurityPolicy(csp)); // Özelleştirilmiş CSP'yi uyguluyoruz

app.use(express.static('./public'));
app.use(expressLayouts);
app.set('layout', path.join(__dirname, 'views', 'layouts', 'layout.ejs'));
app.set('view engine', 'ejs');
app.set('views', './views');

const sessionStore = new MySQLStore({}, db);

app.use(
  session({
    key: 'session_id.book.ekinn.site',
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore, // MySQL Store'u burada belirtiyoruz
    cookie: {
      secure: true, // HTTPS üzerinden iletilebilir
      httpOnly: true, // JavaScript erişimini engeller
      sameSite: 'Lax', // Cross-site isteklerinde cookie gönderilir
      maxAge: 1000 * 60 * 60 * 6, // 6 saat (milisaniye cinsinden)
    },
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cleanRequestBody);

app.use(adminRouter);
app.use(userRouter);
app.use(bookRouter);

app.use((req, res, next) => {
  res.status(404).render('error/error.ejs', { title: '404', statusCode: '404', message: 'Sayfa Bulunamadı' });
});

app.use((err, req, res, next) => {
  console.error(err.stack); // Hata stack'ini loglara yazdır

  // Eğer geliştirme modundaysak, daha ayrıntılı hata mesajı göster
  if (process.env.NODE_ENV === 'development') {
    res.status(500).send(`Something went wrong! ${err.stack}`);
  } else {
    // Üretim ortamında daha güvenli hata mesajı
    res.status(500).render('error/error.ejs', { title: '500', statusCode: '500', message: 'Sunucu Hatası' });
  }
});

app.listen(PORT, () => {});
