var express = require('express');
var router = express.Router();
var template = require('../lib/template')
var auth = require('../lib/auth')

router.get('/', (req, res) => {
  var fmsg = req.flash();
  var feedback = '';
  if (fmsg.success)
    feedback = fmsg.success[0];
  var html = template.html(`
      <h2>HOME</h2>
      <div style="color:blue;">${feedback}</div>
    `,
    auth.statusUI(req, res)
  );
  res.send(html);
});

module.exports = router;