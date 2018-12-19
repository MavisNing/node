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

// 退出登录
exports.showSingnOut = (req, res) => {
    // 清除session中的user信息
    delete req.session.user;
    // 回到登录页
    res.redirect("/signin");
}

// 注册页
exports.showSignup = (req, res) => {
    res.render("signup.html");
}

// 表单处理
exports.handleSignup = (req, res) => {
    const body = req.body;
    // 验证邮箱
    mUser.sqlLogin(body.email, (err, results) => {
        if (err) {
            return res.send({
                code: 500,
                msg: '服务器出错啦'
            });
        }

        if (results[0]) {
            return res.send({
                code: 1,
                msg: '邮箱已存在'
            });
        }

        // 验证昵称
        mUser.sqlNickname(body.nickname, (err, results) => {
            if (err) {
                return res.send({
                    code: 500,
                    msg: '服务器出错啦'
                });
            }
            if (results[0]) {
                return res.send({
                    code: 2,
                    msg: '昵称已存在'
                });
            }

            // 可以注册账号
            mUser.sqlSignup(body, (err, results) => {
                if (err) {
                    return res.send({
                        code: 500,
                        msg: '服务器错误'
                    });
                }
                res.send({
                    code: 200,
                    msg: '注册成功'
                })
            });
        });
    });
}
