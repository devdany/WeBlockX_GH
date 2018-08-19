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

router.get('/token', function(req, res, next){
    res.render('table_list', {title: '민원 참여하기 | WeBlockX'})
});

router.get('/token/detail', function(req, res, next){
    res.render('sub_detail', {title: 'Live | WeBlockX'})
});

router.get('/alert', function(req, res, next){
    res.render('sub_share', {title: '나눔 나누기 | WeBlockX'})
});

router.get('/admin', function(req, res, next){
    res.render('admin', {title: 'admin | WeBlockX'})
});