// 导包
const connection = require('../config/db_config');

exports.sqlLogin = (email, callback) => {
    // 验证用户名和密码
    const sqlstr = 'select * from `users` where email=?';
    connection.query(sqlstr, email, (err, results) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, results);
        }
    })
}
