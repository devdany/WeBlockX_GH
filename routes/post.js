var express = require('express');
var router = express.Router();
const config = require('../config');
const userModel = require('../db/model/user');
const complainModel = require('../db/model/complain');
const TurndownService = require('turndown');
const dateFormatConverter = require('../lib/dateFormatConverter');
const auth = require('../lib/auth');
var turndownService = new TurndownService();
const steem = require('steem');


/* GET home page. */
router.post('/postComplain', function(req, res, next) {

    userModel.findOne({
        where:{
            no: 1
        }
    }).then(async result => {
        console.log(result);
        const title = req.body.title;
        const category = req.body.category.toLowerCase();
        var markdownContent = turndownService.turndown(req.body.content);
        const permlink = (dateFormatConverter.convertToSave(new Date())+'-'+category+'-'+auth.createCode());

        /*await steem.broadcast.comment(config.steem.postPassword, '', config.steem.tag, config.steem.user, permlink, title, markdownContent, config.steem.jsonMetaData, async (posterr, results) => {
            if(posterr){
                res.send('Complain post err: '+posterr);
            }else{
                const payday = new Date();
                payday.setDate(payday.getDate() + 8);

                complainModel.create({
                    permlink: permlink,
                    user_no: result.dataValues.no,
                    hate: 0,
                    payoutdate: dateFormatConverter.convertToSave(payday),
                    writedate: dateFormatConverter.convertToSave(new Date()),
                    category: category,

                }).then(() => {
                    res.send('success');
                }).catch(err => {
                    res.send('db save err: '+err);
                })
            }
        })*/


    })
});

module.exports = router;
