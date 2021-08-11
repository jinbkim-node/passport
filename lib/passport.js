require('dotenv').config();

module.exports = function (app) {
  var authData = {
    email: process.env.email,
    password: process.env.password,
    nickname: process.env.nickname
  };

  var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

  app.use(passport.initialize());
  app.use(passport.session());

  // user : return done(null, authData) 에서의 authData
  // user.email : 세션 스토어에 저장될 식별자
  passport.serializeUser((user, done) => done(null, user.email));

  // id : 세션스토어에 저장되어 있는 식별자
  // authData : request.user에 저장될 값
  passport.deserializeUser((id, done) => done(null, authData));

  passport.use(new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },  // 어떤 폼 필드로 유저이름과 비밀번호를 받을지
    (username, password, done) => {
      if (username === authData.email) {
        if (password === authData.password)
          return done(null, authData, { message: 'Welcome.' });  // 로그인 성공
        else
          return done(null, false, { message: 'Incorrect password.' });  // 잘못된 비밀번호
      }
      else
        return done(null, false, { message: 'Incorrect username.' });  // 잘못된 아이디
    }
  ));
  return passport;
}