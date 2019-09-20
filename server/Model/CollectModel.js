const DbBase  = require('./DbBase');
class TopicModel extends DbBase{
    constructor(){
        super();
        this.table = 'collection';
    }
    addcollect(uid,tid,callback){
        let sql = `INSERT INTO ${this.table}(uid,tid) VALUES (${uid},${tid})`
        this.mydb.query(sql,(err,result)=>{
            if(err){
                console.log(err)
            }else{
                callback(result)
            }
        })
    }
    delcollect(uid,tid,callback){
        let sql = `DELETE FROM ${this.table} WHERE uid=${uid} AND tid=${tid}`
        this.mydb.query(sql,(err,result)=>{
            if(err){
                console.log(err)
            }else{
                callback(result)
            }
        })
    }
    
}
module.exports = TopicModel;