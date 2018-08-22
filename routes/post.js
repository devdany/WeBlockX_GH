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

const steem = require('steem');

const job = {
    user: 'USER',
    admin: 'ADMIN'
}

var noticestorage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, uploadDir);
    },
    filename: (req, file, callback) => {
        callback(null, 'notice-' + Date.now() + '.' + file.mimetype.split('/')[1]);
    }
});

var noticeupload = multer({storage: noticestorage});


router.get('/token', function (req, res, next) {
    complainModel.findAll({
        limit: 4,
        order: [['no', 'DESC']]
    }).then(complains => {
        res.render('table_list', {title: '민원 참여하기 | WeBlockX', complains: complains})
    })
});

router.get('/token/detail/:permlink', async  (req, res, next) => {

    const permlink = req.params.permlink;
    const author = config.steem.user
    await steem.api.getContentAsync(author, permlink)
        .then(async postObject => {

            await complainModel.findOne({
                include: [{
                    model: userModel,
                    required: true,
                }],
                where: {
                    permlink: permlink
                }
            }).then(async dbPost => {
                await steem.api.getContentReplies(author, permlink, (err, replies) => {
                    const post = {
                        type: dbPost.dataValues.type,
                        writedate: dbPost.dataValues.writedate,
                        writer: dbPost.dataValues.USER.dataValues.email,
                        title: dbPost.dataValues.title,
                        content: markdown.toHTML(postObject.body),
                        rawPostObject: postObject,
                        replies: replies
                    }

                    res.render('sub_detail', {title: 'Live | WeBlockX', post: post})
                });

            })
        })
        .catch(error => console.log(error));

});


/* GET home page. */
router.post('/postComplain', function (req, res, next) {

    userModel.findOne({
        where: {
            no: 1
        }
    }).then(async result => {
        const title = req.body.title;
        //const category = req.body.category.toLowerCase();
        var markdownContent = turndownService.turndown(req.body.content);
        const permlink = (dateFormatConverter.convertToSave(new Date()) + /*'-'+category+*/'-' + auth.createCode());

        await steem.broadcast.comment(config.steem.postPassword, '', config.steem.tag, config.steem.user, permlink, title, markdownContent, config.steem.jsonMetaData, async (posterr, results) => {
            if (posterr) {
                res.send('Complain post err: ' + posterr);
            } else {
                const payday = new Date();
                payday.setDate(payday.getDate() + 8);

                complainModel.create({
                    permlink: permlink,
                    user_no: result.dataValues.no,
                    hate: 0,
                    payoutdate: dateFormatConverter.convertToSave(payday),
                    writedate: dateFormatConverter.convertToSave(new Date()),
                    //category: category,
                    title: title,
                    type: req.body.type,
                    feedbackInfo: req.body.feedbackInfo
                }).then(() => {
                    res.send({message: 'success', permlink: permlink});
                }).catch(err => {
                    res.send('db save err: ' + err);
                })
            }
        })
    })
});

router.post('/getPostInfo', (req, res) => {
    complainModel.findOne({
        where:{
            no: req.body.no
        }
    }).then(complain => {
        //permlink받아서 포스트 정보 받아와서 데이터로 뿌려주면됨

    })
})


router.post('/postFeedback', (req, res) => {
    userModel.findOne({
        where: {
            no: 1
        }
    }).then(async (user) => {
        if (user) {
            complainModel.findOne({
                where: {
                    complain_no: req.body.complain_no
                }
            }).then(async result => {
                const manager_no = req.body.manager_no;

                await userModel.findOne({
                    where: {
                        no: manager_no
                    }
                }).then(async managerResult => {
                    const manager = managerResult.dataValues;
                    const complain = result.dataValues;
                    const permlink = dateFormatConverter.convertToSave(new Date()) + '-feedback-to-' + complain.no + '-' + auth.createCode();

                    const content = `<p>${complain.title} 에 대한 피드백입니다. 담당자는 ${manager.steemId} 입니다. 이후 진행되는 피드백은 담당자가 직접 입력합니다.</p>`
                    const markdownContent = turndownService.turndown(content);

                    await steem.broadcast.comment(config.steem.managerPostPassword, '', config.steem.tag, config.steem.manager, permlink, title, markdownContent, config.steem.jsonMetaData, async (posterr, results) => {
                        if (posterr) {
                            res.send('Feedback post err: ' + posterr);
                        } else {
                            const payday = new Date();
                            payday.setDate(payday.getDate() + 8);

                            feedbackModel.create({
                                permlink: permlink,
                                user_no: result.dataValues.no,
                                hate: 0,
                                payoutdate: dateFormatConverter.convertToSave(payday),
                                writedate: dateFormatConverter.convertToSave(new Date()),
                                complain_no: complain.no

                            }).then(() => {
                                res.send('success');
                            }).catch(err => {
                                res.send('db save err: ' + err);
                            })
                        }
                    })

                })
            })
        }
    })
})

router.post('/ajax_summernote', noticeupload.single('noticeImg'), function (req, res) {
    res.send('/images/' + req.file.filename);
});

module.exports = router;
