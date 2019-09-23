const express = require('express');
// const UserModel = require(__dirname + '/../Model/UserModel');
const router = express.Router();
const multer=require('multer')
const fs = require('fs');
let hostname = 'http://localhost:81/'
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let dirname = __dirname+'/../uploads/'+new Date().getFullYear()+'/'+(new Date().getMonth()+1).toString().padStart(2,'0');
        if(!fs.existsSync(dirname)){
            fs.mkdirSync(dirname,{recursive:true})
        }
        cb(null,dirname)
    },
    filename: function (req, file, cb) {
        cb(null, new Date().valueOf() + '_' + Math.random().toString().substr(2, 6) + '.' + file.originalname.split('.').pop())
    }
})

var upload = multer({
    storage: storage
})
//上传头像
router.post('/', upload.single('file'), (req, res) => {
    // console.log(req.file);
    let data = {
        "code": 0,
        "msg": "",
        "data": {}
    }
    let dirname = 'uploads/'+new Date().getFullYear()+'/'+(new Date().getMonth()+1).toString().padStart(2,'0')+'/';
    data.data.src = hostname + dirname + req.file.filename;
    res.json(data.data);
    console.log(data)
});


router.post('/img',upload.array('imgs'),(req,res)=>{
    // console.log(req.files);
    let data = {
        "errno": 0,
        "data": []
    }
    let dirname = 'uploads/'+new Date().getFullYear()+'/'+(new Date().getMonth()+1).toString().padStart(2,'0')+'/';
    req.files.forEach(el=>{
        data.data.push(hostname + dirname + el.filename);
    });
    res.json(data);
});


module.exports=router

