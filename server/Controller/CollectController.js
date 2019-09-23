const express = require('express');
const CollectModel = require('../Model/CollectModel');
const router = express.Router();
// 收藏
router.post('/addcollect', (req, res) => {
    let collectModel = new CollectModel();
    collectModel.addcollect(req.body.uid,req.body.tid,req.body.collection,(results)=>{
        console.log(results)
        if(results[0].affectedRows){
            res.json({code:1,Msg:'收藏成功'})
        }
    })
    
})

// 取消收藏
router.post('/delcollect', (req, res) => {
    let collectModel = new CollectModel();
    collectModel.delcollect(req.body.uid,req.body.tid,req.body.collection,(results)=>{
        if(results[0].affectedRows){
            res.json({code:1,Msg:'取消收藏成功'})
        }
    })
})

module.exports = router;