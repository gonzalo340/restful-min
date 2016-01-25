var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Users list');
});

router.get('/add', function(req, res, next) {
  res.send('User add');
});

module.exports = router;
