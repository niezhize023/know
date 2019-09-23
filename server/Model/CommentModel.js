const DbBase  = require('./DbBase');
class TopicModel extends DbBase{
    constructor(){
        super();
        this.table = 'comment';
    }
    addcoment(info,callback){
        let fieldstr = '',field = '';
        let data = [];
        let isfirst = true
        for (const key in info) {
            if (info.hasOwnProperty(key)) {
                fieldstr +=(isfirst?'':',')+key;
                field +=(isfirst?'':',')+'?';
                data.push(info[key]);
            }
            isfirst = false;
        }
        let sql = `INSERT INTO ${this.table}(${fieldstr}) VALUES (${field})`
        this.mydb.query(sql,data,(err,result)=>{
            if(err){
                console.log(err)
            }else{
                callback(result)
            }
        })
    }
    
}
module.exports = TopicModel;