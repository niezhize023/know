const express=require('express')
const BackstageModel=require(__dirname+'/../Model/BackstageModel')
const router=express.Router()

router.get('/info', (req, res) => {
    // console.log(req)
   
    let backstageModel=new BackstageModel()
    backstageModel.getinfo((ob)=>{
        res.json(ob)
    })
});
router.post('/remove', (req, res) => {
    // console.log(req)
    var tid=req.body.tid
    let backstageModel=new BackstageModel()
    backstageModel.getremove(tid,(ob)=>{
        res.json(ob)
    })
});

router.post('/searchid', (req, res) => {
    var uid=req.body.uid
    let backstageModel=new BackstageModel()
    backstageModel.getsearchid(uid,(ob)=>{
        res.json(ob)
    })
});

router.post('/searchtitle', (req, res) => {
    var title=req.body.title
    let backstageModel=new BackstageModel()
    backstageModel.getsearchtitle(title,(ob)=>{
        res.json(ob)
    })
});
module.exports=router