var express = require('express');
var router = express.Router();

/* Routes includes */
var users = require('../routes/users');
var home = require('../routes/home');
var example = require('../routes/example');
var articulos = require('../routes/articulos');
/* End Routes includes */

router.use('/users', users);
router.use('/example', example);
router.use('/articulos', articulos);
router.use('/', home);

// catch 404 and forward to error handler
router.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = router;
