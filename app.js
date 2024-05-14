const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path'); //
const session = require('express-session');
const dotenv = require('dotenv');
const hpp = require('hpp');
const helmet = require('helmet');
const cors = require('cors');
const passport = require('passport');
const app = express();
const dataRouter = require('./routes/datacore');
const graphRouter = require('./routes/graph');
dotenv.config();
app.set('port', process.env.PORT || 3001);

if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));
  app.use(hpp());
  app.use(helmet());
} else {
  app.use(morgan('dev'));
}

const sessionMiddleware = session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: true,
    domain: process.env.NODE_ENV === 'production' && '.firstcorea.com',
  },
});
app.use(
  cors({
    origin: true, // 클라이언트 주소로 변경
    credentials: true,
  })
);
app.use((req, res, next) => {
  // Disable caching
  res.setHeader(
    'Cache-Control',
    'no-store, no-cache, must-revalidate, private'
  );
  next();
});

app.use(express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

app.use('/datacore', dataRouter);
app.use('/graph', graphRouter);
// 에러 처리 미들웨어
app.use((err, req, res, next) => {
  console.error(err); // 콘솔에 에러를 출력
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
  res.send('Internal Server Error');
});

app.get('/', (_req, res) => {
  res.send('hello express');
});

// 404 응답 미들웨어
app.use((req, _res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});
app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});
