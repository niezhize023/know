const express = require('express');
const UserModel = require('../Model/UserModel');
const router = express.Router();
router.post('/reg', (req, res) => {
    let userModel = new UserModel();
    userModel.selectuser(req.body.name, (results) => {
        if (results.length > 0) {
            res.json({
                code: -1,
                Msg: '该用户已存在'
            })
        } else {
            userModel.adduser(req.body.name, req.body.passw, (results) => {
                if (results.affectedRows) {
                    res.json({
                        code: 1,
                        Msg: '注册成功'
                    })
                }

            })
        }
    })

})
router.post('/login', (req, res) => {
    
    // 需要对数据进行操作  Model 
    let userModel = new UserModel();
    // 对数据进行处理 passwd1
    // console.log(req.body);
    userModel.gteUserByname(req.body, (results) => {
        // console.log(results);
        let re = {
            code: 1,
            Msg: '登录成功'
        }
        if (results.length == 0) {
            re = {
                code: -1,
                Msg: '用户不存在'
            };
        } else if(results[0].passwd != req.body.passwd){
            re = {
                code: 0,
                Msg: '密码错误'
            };
        }else{
            req.session.uid = results[0].uid;
            req.session.username = results[0].username;
            console.log(req.session);
        }
        res.json(re);
    });
});
module.exports = router;