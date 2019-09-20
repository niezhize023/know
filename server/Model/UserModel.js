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
            console.log(ob)

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
            console.log(ob)

            cb(ob);
        })

    }
    writearticle(title,editorContent,cb){
        let sql = 'insert into topic(title,content) values (?,?)'
        this.mydb.query(sql, [title,editorContent], (err, results) => {
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


}


module.exports = UserModel