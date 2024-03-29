const express = require('express');
const UserModel = require(__dirname + '/../Model/UserModel');
const router = express.Router();

router.post("/login", (req, res) => {
    // console.log(req.body)
    let name = req.body.name
    let passwd = req.body.passwd
    let userModel = new UserModel()
    userModel.login(name, passwd, (ob) => {
        // console.log(ob)
        res.json(ob)
    })
})
router.post("/reg", (req, res) => {
    // res.send(111);
    // console.log(req.body)
    let name = req.body.name
    let passwd = req.body.passwd
    let userModel = new UserModel()
    userModel.registe(name, passwd, (ob) => {
        // console.log(ob)
        res.json(ob)
    })
})

router.post("/checkreg", (req, res) => {
    // console.log(req.body)
    let name = req.body.name
    let userModel = new UserModel()
    userModel.checkuser(name, (ob) => {
        // console.log(ob)
        res.json(ob)
    })
})
router.post("/admin", (req, res) => {
    let name = req.body.name
    let passwd = req.body.passwd
    let userModel = new UserModel()
    userModel.admin(name, passwd, (ob) => {
        res.json(ob)
    })
})

router.post("/write", (req, res) => {
    let title = req.body.title
    let uid = req.body.uid
    let editorContent = req.body.editorContent
    let publishtime = req.body.publishtime
    let userModel = new UserModel()
    userModel.writearticle(uid, title, editorContent, publishtime, (ob) => {
        res.json(ob)
    })
})
router.post("/getuserinfo", (req, res) => {
    let userModel = new UserModel()
    userModel.getuserinfo(req.body.uid, (result) => {
        res.json(result)
    })

})

router.post("/getcollection", (req, res) => {
    console.log(req.body.uid)
    let userModel = new UserModel()
    userModel.getcollection(req.body.uid, (result) => {
        // console.log(result)
        res.json(result)
    })

})

router.post("/getcollectiontopic", (req, res) => {
    // console.log(req.body.data.tid)
    var str = req.body.data.tid
    let userModel = new UserModel()
    userModel.getcollectioninfo(str, (result) => {
        // console.log(result)
        res.json(result)
    })
})
//修改用户信息
router.post("/editinfo", (req, res) => {
    let userModel = new UserModel();
    // console.log(req.body)
    userModel.edituserinfo(req.body.uid, req.body.imageUrl, req.body.live, req.body.gender, req.body.phone, req.body.introduction, req.body.nickname, (result) => {
        // console.log(result)
        res.json(req.body)
    })
})

//查询用户
router.get("/selectuser", (req, res) => {
    let userModel = new UserModel();
    // console.log(req.query.uid)
    userModel.selectuser(req.query.uid, (result) => {
        res.json(result)
    })
})
router.post("/getarticle", (req, res) => {
    var uid = req.body.data.uid
    let userModel = new UserModel()
    userModel.getarticleinfo(uid, (result) => {
        // console.log(result)
        res.json(result)
    })
})

router.post("/getmysearsh", (req, res) => {
    var val = req.body.inputvalue
    // console.log(val)
    let userModel = new UserModel()
    userModel.getmysearshinfo(val, (result) => {
        res.json(result)
    })

})
module.exports = router