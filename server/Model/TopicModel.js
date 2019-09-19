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
}
module.exports = TopicModel;