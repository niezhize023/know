const express = require('express');
const TopicModel = require('../Model/TopicModel');
const router = express.Router();
router.get('/gettopic', (req, res) => {
    let topicModel = new TopicModel();
    topicModel.getalltopic((results) => {
        // console.log(results)
        res.json(results)
    })

})
router.post('/getonetopic', (req, res) => {
    //存放所有评论某话题的uid
    var userarr = []
    let topicModel = new TopicModel();
    // 存放每一查询返回的结果
    var resul = []
    //获取对应话题的信息
    topicModel.getonetopic(req.body.tid, (results) => {
        // console.log(results[1])
        resul.push(results)
        for (var i = 0; i < results[1].length; i++) {
            userarr.push(results[1][i].uid)
        }
        // console.log(userarr)
        //获取评论该话题的用户信息
        topicModel.getalluserinfo(userarr, (result) => {
            resul.push(result)
            res.json(resul)
        })

    })
    // res.json(req.body)
})


module.exports = router;