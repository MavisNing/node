// 导包
const moment = require('moment');
const mTopic = require('../models/m-topic');


// 文章列表页
exports.showIndex = (req, res) => {

    // 客户端的视图文件有没有导入
    mTopic.showTopic((err, results) => {
        if (err) {
            return res.send({
                code: 500,
                msg: '服务器出错了!'
            });
        }
        res.render("index.html", {
            list: results,
            user: req.session.user
        });
    });
    
}

// 发布文章
exports.showCreateTopic = (req, res) => {
    res.render("topic/create.html");
}

// 发布文章提交
exports.handleTopicCreat = (req, res) => {  
    // 接收表单数据
    const body = req.body;

    // 给body添加成员
    body.createdAt = moment().format();

    // userid ()
    body.userId = req.session.user.id;

    mTopic.creatTopic(body, (err, results) => {
        if (err) {
            return res.send({
                code: 500,
                msg: '服务器出错了!'
            });
        }
        res.send({
            code: 200,
            msg: '文章发布成功'
        });
    });
}
