var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session')
var FileStore = require('session-file-store')(session)
var flash = require('connect-flash');
var fs = require('fs');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));  // extended: 중첩된 객체표현을 허용할지
app.use(session({
  secret: 'jinbkim',  // 이 값을 통해 세션을 암호화 하여 저장
  resave: false,  // 세션의 변화가 없어도 다시 저장을 할건지 
  saveUninitialized: true,  // 세션에 저장할 내용이 없어도 처음부터 세션을 설정할지
  store: new FileStore()  // 세션 저장을 어떻게 할건지
}))
app.use(flash());

var passport = require('./lib/passport')(app);

app.get('*', function (request, response, next) {
  setTimeout(() => { next(); }, 200);  // 이유는 모르겠지만 이렇게 안멈추면 로그인이 잘안됨..
});


var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth')(passport);

app.use('/', indexRouter);
app.use('/auth', authRouter);

app.use((req, res, next) => res.status(404).send('404 Not Found'));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('500 Server Error');
})

app.listen(3000, () => console.log('Listening On Port 3000...'));