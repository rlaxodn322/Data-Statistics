exports.isLoggedIn = (req, res, next) => {
  console.log(req.isAuthenticated);
  if (req.isAuthenticated()) {
    next(); // next안에 인자가 있으면 에러처리 / 없으면 다음 미들웨어로
  } else {
    res.status(401).send('로그인이 필요합니다.');
  }
};
exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send('로그인하지 않은 사용자만 접근 가능합니다.');
  }
};
