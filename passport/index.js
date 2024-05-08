// const passport = require('passport');
// const local = require('./local');
// const { User } = require('../models');

// module.exports = () => {
//   // serializeUser: 사용자 정보 객체를 세션에 아이디로 저장
//   passport.serializeUser((user, done) => {
//     done(null, user.id);
//   });

//   // deserializeUser: 세션에 저장한 아이디를 통해 사용자 정보 객체 호출
//   passport.deserializeUser(async (id, done) => {
//     try {
//       const user = await User.findOne({ where: { id } });
//       done(null, user); // user => req.user에 저장
//     } catch (err) {
//       console.error(err);
//       done(err);
//     }
//   });

//   local();
// };
