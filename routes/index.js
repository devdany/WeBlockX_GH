var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'WeBlockX' });
});

module.exports = router;

router.get('/minwon', function(req, res, next){
    res.render('sub_minwon', {title: 'Minwon | WeBlockX'})
});

router.get('/live', function(req, res, next){
    res.render('sub_live', {title: 'Live | WeBlockX'})
});