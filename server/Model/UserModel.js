const mysql = require('mysql')
const DbBase = require('./DbBase');
class UserModel extends DbBase {
    login(name, passwd, cb) {
        let sql = 'select * from users where nickname=? and password=?'
        this.mydb.query(sql, [name, passwd], (err, results) => {
            // console.log(results)
            // cb(results)
            let ob = {
                code: 1,
                resu: []
            };
            // if(passwd==results[0].passwd){

            // }

            if (err) {
                ob.code = -1;
                // console.log(err);
            } else {
                ob.resu = results;

            }
            // console.log(ob)

            cb(ob);
        })

    }
    registe(name, passwd, cb) {
        let sql = 'insert into users (nickname,password) values (?,?)'
        this.mydb.query(sql, [name, passwd], (err, results) => {

            let ob = {
                code: 1,
                resu: []
            };
            if (err) {
                ob.code = -1;
            } else {
                ob.resu = results;
            }
            cb(ob);
        })

    }
    admin(name, passwd, cb) {
        let sql = 'select * from admin where username=? and password=?'
        this.mydb.query(sql, [name, passwd], (err, results) => {
            let ob = {
                code: 1,
                resu: []
            };
            if (err) {
                ob.code = -1;
            } else {
                ob.resu = results;

            }
            // console.log(ob)

            cb(ob);
        })

    }
    writearticle(uid,title,editorContent,publishtime,cb){
        let sql = 'insert into topic(uid,title,content,time) values (?,?,?,?)'
        this.mydb.query(sql, [uid,title,editorContent,publishtime], (err, results) => {
            let ob = {
                code: 1,
                resu: []
            };
            if (err) {
                ob.code = -1;
                console.log(err)
            } else {
                ob.resu = results;

            }
            console.log(ob)

            cb(ob);
        })
    }
    checkuser(name,cb){
        let sql = 'select * from users where nickname=?'
        this.mydb.query(sql, [name], (err, results) => {
            // console.log(results[0])
            
            let ob = {
                code: 1,
                resu: []
            };

            if (results[0]) {
                 ob.resu = results;
            } else {
                ob.code = -1;
              
                // console.log(ob)
            }
            cb(ob);
        })
    }
    
    getuserinfo(uid,callback){
        let sql = `SELECT nickname,avatar FROM users WHERE uid=${uid}`
        this.mydb.query(sql,(err,results)=>{
            if(err){
                console.log(err)
            }else{
                callback(results)
            }
        })
    }
    getcollection(uid,cb){
        let sql = `SELECT tid FROM collection WHERE uid=${uid}`
        this.mydb.query(sql,(err,results)=>{
        //    console.log(results.length)
           var mycollectionarr=[]
           for(var i=0;i<results.length;i++){
        //    console.log(results[i].tid)
           mycollectionarr.push(results[i].tid)
           } 
      
            let ob = {
                 code: 1,
                 resu: []
             };
 
             if (results[0]) {
                  ob.resu = mycollectionarr;
             } else {
                 ob.code = -1;
             }
             cb(ob);
         }) 
       

    }
    getcollectioninfo(str,cb){
        let sql = `SELECT * FROM topic  WHERE tid in (${str})`
        this.mydb.query(sql,(err,results)=>{
            if(err){
                console.log(err)
            }else{
                cb(results)
            }
        })
    }
    getarticleinfo(uid,cb){
        let sql = `SELECT * FROM topic  WHERE uid in (${uid})`
        this.mydb.query(sql,(err,results)=>{
            if(err){
                console.log(err)
            }else{
                cb(results)
            }
        })
    }
    getmysearshinfo(val,cb){
        // console.log(str)
        let sql = `select * from topic where title like '%${val}%'`
     
        this.mydb.query(sql,(err,results)=>{
            if(err){
                console.log(err)
            }else{
                cb(results)
            }
        })
    }
    edituserinfo(uid,imageurl,live,gender,phone,introduction,nickname,callback){
        let sql = `UPDATE users SET avatar='${imageurl}',live='${live}',gender='${gender}',phone='${phone}',introduction='${introduction}',nickname='${nickname}' WHERE uid=${uid};`
        let comsql = `UPDATE comment SET avatar='${imageurl}',nickname='${nickname}' WHERE uid=${uid}`
        this.mydb.query(sql+comsql,(err,results)=>{
            if(err){
                console.log(err)
            }else{
                callback(results)
            }
        })
    }
    //查询用户
    selectuser(uid,callback){
        let sql = `SELECT * FROM users WHERE uid=${uid}`;
        this.mydb.query(sql,(err,results)=>{
            if(err){
                console.log(results)
            }else{
                callback(results)
            }
        })
    }
    //更新评论的用户信息
    /* updatacomtinfo(uid,nickname,imageurl,callback){
        
        this.mydb.query(sql,(err,results)=>{
            if(err){
                console.log(results)
            }else{
                callback(results)
            }
        })
    } */
    
}


module.exports = UserModel