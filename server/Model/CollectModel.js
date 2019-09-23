const DbBase  = require('./DbBase');
class TopicModel extends DbBase{
    constructor(){
        super();
        this.table = 'collection';
    }
    addcollect(uid,tid,collection,callback){
        let sql = `INSERT INTO ${this.table}(uid,tid) VALUES (${uid},${tid});`
        let sqlnum = `UPDATE topic SET collection=${collection} WHERE tid=${tid}`
        this.mydb.query(sql+sqlnum,(err,result)=>{
            if(err){
                console.log(err)
            }else{
                callback(result)
            }
        })
    }
    delcollect(uid,tid,collection,callback){
        let sql = `DELETE FROM ${this.table} WHERE uid=${uid} AND tid=${tid};`
        let sqlnum = `UPDATE topic SET collection=${collection} WHERE tid=${tid}`
        this.mydb.query(sql+sqlnum,(err,result)=>{
            if(err){
                console.log(err)
            }else{
                callback(result)
            }
        })
    }
    
}
module.exports = TopicModel;