// 导包
const connection = require('../config/db_config');

exports.sqlLogin = (email, callback) => {
    // 验证邮箱
    const sqlstr = 'select * from `users` where email=?';
    connection.query(sqlstr, email, (err, results) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, results);
        }
    })
}

exports.sqlNickname = (nickname, callback) => {
    // 验证昵称
    const sqlstr = 'select * from `users` where nickname=?';
    connection.query(sqlstr, nickname, (err, results) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, results);
        }
    })
}
// 注册账号
exports.sqlSignup = (body, callback) => {
    const sqlstr = 'insert into `users` set ?';
    connection.query(sqlstr, body, (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results);
    })
}