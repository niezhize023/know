const DbBase  = require('./DbBase');
class UserModel extends DbBase{
    constructor(){
        super();
        this.table = 'users';
    }
    selectuser(username,callback){
        let sql = `SELECT * FROM ${this.table} WHERE username='${username}' `
        this.mydb.query(sql,(err,result)=>{
            if(err){
                console.log(err)
                return ;
            }else{
                callback(result)
            }
        })
    }
    adduser(username,passw,callback){
        let asql = `INSERT INTO ${this.table}(username,passwd) VALUES ('${username}','${passw}')`;
        this.mydb.query(asql,(err,result)=>{
            if(err){
                console.log(err)
                return ;
            }else{
                callback(result)
            }
        })
    } 
}
module.exports = UserModel;