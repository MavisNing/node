// 导包
const connection = require('../config/db_config');

// 查询所有文章数据
exports.showTopic = (callback) => {
    const sqlstr = 'select * from `topics` order by id desc';
    connection.query(sqlstr, (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, results);
    })
}

// 写入文章
exports.creatTopic = (connect, callback) => {
    const sqlstr = 'insert into `topics` set ?';
    connection.query(sqlstr, connect, (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results);
    });
}