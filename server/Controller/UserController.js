const express = require('express');
const UserModel = require(__dirname + '/../Model/UserModel');
const router = express.Router();

router.post("/login",(req,res)=>{
    // console.log(req.body)
    let name=req.body.name
    let passwd=req.body.passwd
    let userModel=new UserModel()
    userModel.login(name,passwd,(ob)=>{
        // console.log(ob)
        res.json(ob)
    })
})
router.post("/reg",(req,res)=>{
    // res.send(111);
    console.log(req.body)
    let name=req.body.name
    let passwd=req.body.passwd
    let userModel=new UserModel()
    userModel.registe(name,passwd,(ob)=>{
        // console.log(ob)
        res.json(ob)
    })
})

router.post("/checkreg",(req,res)=>{
    console.log(req.body)
    let name=req.body.name
    let userModel=new UserModel()
    userModel.checkuser(name,(ob)=>{
        // console.log(ob)
        res.json(ob)
    })
})
router.post("/admin",(req,res)=>{
    let name=req.body.name
    let passwd=req.body.passwd
    let userModel=new UserModel()
    userModel.admin(name,passwd,(ob)=>{
        res.json(ob)
    })
})

router.post("/write",(req,res)=>{
    let title=req.body.title
    let uid=req.body.uid
    let editorContent=req.body.editorContent
    let publishtime=req.body.publishtime
    let userModel=new UserModel()
    userModel.writearticle(uid,title,editorContent,publishtime,(ob)=>{
        res.json(ob)
    })
})



module.exports=router