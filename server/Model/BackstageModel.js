const mysql = require('mysql')
const DbBase=require('./DbBase')
class BackstageModel extends DbBase{

    getinfo(cb){
        let sql='select * from topic where 1'
        // let mysql='select nickname from users where uid'
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
    getremove(tid,cb){
        let sql='delete from topic where tid=?'
        this.mydb.query(sql,[tid],(err,result)=>{
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
    getsearchid(uid,cb){
        console.log(uid)
        let sql='select * from topic where uid=?'
        this.mydb.query(sql,[uid],(err,result)=>{
            console.log(result)
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
    getsearchtitle(title,cb){
        let sql=`select * from topic where title like '%${title}%'`
        this.mydb.query(sql,(err,result)=>{
            console.log(result)
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