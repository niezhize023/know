const mysql = require('mysql')
const DbBase=require('./DbBase')
class BackstageModel extends DbBase{

    getinfo(cb){
        let sql='select * from topic where 1'
        this.mydb.query(sql,(err,result)=>{
            let ob={code:1,re:''}
            if(err){
                ob.code=-1
            }else{
                console.log(ob);  
                ob.re=result 
            }
            cb(ob)
        })
    }
}
module.exports=BackstageModel