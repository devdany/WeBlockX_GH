var express = require('express');
var router = express.Router();
const config = require('../config');
const userModel = require('../db/model/user');
const complainModel = require('../db/model/complain');
const feedbackModel = require('../db/model/feedback');
const TurndownService = require('turndown');
const multer = require('multer');
const path = require('path');
const uploadDir = path.join(__dirname, '../public/images');
const dateFormatConverter = require('../lib/dateFormatConverter');
const auth = require('../lib/auth');
var turndownService = new TurndownService();
const markdown = require('markdown').markdown;


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


router.get('/alert', function(req, res, next){
    res.render('sub_share', {title: '나눔 나누기 | WeBlockX'})
});

router.get('/admin', function(req, res, next){
    complainModel.findAll({
        limit: 4,
        order: [['no', 'DESC']]
    }).then(complains => {
        res.render('admin', {title: '민원 참여하기 | WeBlockX', complains: complains})
    })
});