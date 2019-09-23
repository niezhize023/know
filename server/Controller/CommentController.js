const express = require('express');
const CommentModel = require('../Model/CommentModel');
const router = express.Router();
// 收藏
router.post('/addcoment', (req, res) => {
    let commentModel = new CommentModel();
    console.log(req.body)
    commentModel.addcoment(req.body,(results)=>{
        // console.log(results)
        /* if(results[0].affectedRows){
            res.json({code:1,Msg:'收藏成功'})
        } */
        res.json({code:1,Msg:'回答成功'})
    })
    
})



module.exports = router;