// 处理函数模块

// 导包
const mUser = require('../models/m-user');

// 登录页
exports.showLogin = (req, res) => {
    res.render("signin.html");
}

// 表单数据处理
exports.handleLogin = (req, res) => {
    // 接收表单数据
    const body = req.body;
    // console.log(body);

    mUser.sqlLogin(body.email, (err, results) => {
        if (err) {
            return res.send({
                code: 500,
                msg: '服务器出现错误'
            });
        }

        if (results.length === 0) {
            return res.send({
                code: 1,
                msg: '邮箱不存在'
            });
        }

        if (results[0].password !== body.password) {
            return res.send({
                code: 2,
                msg: '密码错误'
            });
        }

         // 使用req.session保存正确的用户信息
        req.session.user = results[0];

        res.send({
            code: 200,
            msg: '登录成功'
        });
    }) 

}
