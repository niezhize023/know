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
    let topicModel = new TopicModel();
    //获取对应话题的信息
    let rearr = []
    topicModel.getonetopic(req.body.tid, req.body.uid,(results) => {
        // console.log()
        // res.json(results)
        // console.log(results)
        rearr.push(results)
        topicModel.getpublish(results[0][0].uid, (results) => {
            // console.log(results)
            rearr.push(results[0])
            res.json(rearr)
            //获取评论该话题的用户信息
        })
    })
    // res.json(req.body)
})
//获取话题评论
router.post('/conment',(req,res)=>{
    // res.json(2222)
    let userarr=[]
    let resul = []
    let topicModel = new TopicModel();
    topicModel.getallcoment(req.body.tid,(results)=>{
        // console.log(results)
        resul.push(results)
        // console.log(resul)
        if(results.length){
            for (let index = 0; index < results.length; index++) {
                userarr.push(results[index].uid)
            }
            topicModel.getcomserinfo(userarr,(results)=>{
                resul.push(results)
                // console.log(resul)
                res.json(resul)
            })
        }else{
            res.json(resul)
        }
        
        
    })
    
})


module.exports = router;