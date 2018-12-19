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

// 文章详情页数据
exports.handleShowTopic = (ID, callback) => {
    const sqlstr = 'select * from `topics` where id = ?';
    connection.query(sqlstr, ID, (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results);
    });
}

// 文章详情页删除数据
exports.DeleteTopic = (ID, callback) => {
    const sqlstr = 'delete from `topics` where id = ?';
    connection.query(sqlstr, ID, (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results);
    })
}

// 文章详情页编辑
// 读取
exports.EditTopicShow = (ID, callback) => {
    const sqlstr = 'select * from `topics` where id = ?';
    connection.query(sqlstr, ID, (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results);
    })
}
// 编辑
exports.EditTopic = (body, ID, callback) => {
    const sqlstr = 'update `topics` set ? where id = ?';
    connection.query(sqlstr, [body, ID], (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results);
    })
}