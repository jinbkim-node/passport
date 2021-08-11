var express = require('express');
var router = express.Router();
var template = require('../lib/template.js')

module.exports = function(passport){
  router.get('/login', (req, res) => {
    var fmsg = req.flash();
    var feedback = '';
    if (fmsg.error)
      feedback = fmsg.error[0];
    var html = template.html(`
      <div style="color:red;">${feedback}</div>
      <form action="/auth/login_process" method="post">
        <p><input type="text" name="email" placeholder="email"></p>
        <p><input type="password" name="password" placeholder="password"></p>
        <p><input type="submit" value="login"></p>
      </form>
    `,'');
    res.send(html);
  });

  router.post('/login_process',
    passport.authenticate('local', {  // local : 유저네임과 비밀번호로 로그인하는 방식
      successRedirect: '/',
      failureRedirect: '/auth/login',
      failureFlash: true,
      successFlash: true
    }),
  );

  router.get('/logout', (req, res) => {
    req.logout();
    req.session.save(() => res.redirect('/'));
  });

  return router;
}