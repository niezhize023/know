const DbBase = require('./DbBase');
class TopicModel extends DbBase {
    constructor() {
        super();
        this.table = 'comment';
    }
    addcoment(info, callback) {
        let fieldstr = '',
            field = '';
        let data = [];
        let isfirst = true
        for (const key in info) {
            if (info.hasOwnProperty(key)) {
                if (key == 'comment') {
                    continue;
                } else {
                    fieldstr += (isfirst ? '' : ',') + key;
                    field += (isfirst ? '' : ',') + '?';
                    data.push(info[key]);
                }

            }
            isfirst = false;
        }
        let sql = `INSERT INTO ${this.table}(${fieldstr}) VALUES (${field});`
        let caql = `UPDATE topic SET comment=${info.comment} WHERE tid=${info.tid}`
        this.mydb.query(sql+caql, data, (err, result) => {
            if (err) {
                console.log(err)
            } else {
                callback(result)
            }
        })
    }

}
module.exports = TopicModel;