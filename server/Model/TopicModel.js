const DbBase  = require('./DbBase');
class TopicModel extends DbBase{
    constructor(){
        super();
        this.table = 'topic';
    }
    getalltopic(callback){
        let sql = `SELECT * FROM ${this.table}`
        this.mydb.query(sql,(err,result)=>{
            if(err){
                console.log(err)
                callback(result)
            }else{
                callback(result)
            }
        })
    }
    getonetopic(tid,callback){
        let sql = `SELECT * FROM ${this.table} WHERE tid=${tid};`;
        let resql = `SELECT * FROM comment WHERE tid=${tid};`;
        // let usql = `SELECT nickname avatar FROM users `
        this.mydb.query(sql+resql,(err,result)=>{
            if(err){
                console.log(err);
            }else{
                callback(result);
            }
        })
    }
    getalluserinfo(userarr,callback){
        let field = ''
        let isFirst = true;
        for (let index = 0; index < userarr.length; index++) {
            field += (isFirst ? '':', ') + '?';
            isFirst = false
        }
        let sql = `SELECT nickname, avatar FROM users WHERE uid IN(${field})`
        this.mydb.query(sql,userarr,(err,results)=>{
            if(err){
                console.log(err)
            }else{
                callback(results)
            }
        })
    }
}
module.exports = TopicModel;