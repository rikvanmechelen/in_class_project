const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'BookedIn' });
});

router.get('/form', function(req, res, next) {
  res.render('index');
});

module.exports = router;