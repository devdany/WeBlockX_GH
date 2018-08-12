const assert = require('assert');
const request = require('supertest');
const expect = require('chai').expect;
const app = require('./app');

//post complain
describe('steemjs test', () => {
    it('post minwon test', function(done){
        this.timeout(30000);

        const title = '전봇대가 나갔어요';
        const content = `<h1>짜증나요!!!</h1><p>서울시 a동 b 앞에 전봇대가 나갔어요</p><p>고쳐주세요!</p>`

        request(app)
            .post('/post/postComplain')
            .send({
                title: title,
                category: 'facility',
                content: content
            })
            .expect(200)
            .end((err, res) => {
                if (err) {
                    throw new Error(err)
                } else {
                    if (res.text == 'success') {
                        done();
                    } else {
                        throw new Error(res.text);
                    }

                }

            })
    })


})

