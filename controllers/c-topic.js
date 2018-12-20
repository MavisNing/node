// 导包
const moment = require('moment');
const mTopic = require('../models/m-topic');


// 文章列表页
exports.showIndex = (req, res, next) => {

    // 客户端的视图文件有没有导入
    mTopic.showTopic((err, results) => {
        if (err) {
            return next(err);
        }
        res.render("index.html", {
            list: results,
            user: req.session.user
        });
    });
    
}

// 发布文章
exports.showCreateTopic = (req, res, next) => {
    res.render("topic/create.html");
}

// 发布文章提交
exports.handleTopicCreat = (req, res, next) => {  
    // 接收表单数据
    const body = req.body;

    // 给body添加成员
    body.createdAt = moment().format();

    // userid ()
    body.userId = req.session.user.id;

    mTopic.creatTopic(body, (err, results) => {
        if (err) {
            return next(err);
        }
        res.send({
            code: 200,
            msg: '文章发布成功'
        });
    });
}

// 文章详情页
exports.showTopic = (req, res, next) => {
    // console.log(req.params);
    const body = req.params.TopicId;
    mTopic.handleShowTopic(body, (err, results) => {
        if (err) {
            return next(err);
        }

        res.render("topic/show.html", {
            list: results[0],
            sessionUserId: req.session.user ? req.session.user.id : 0 
        });
    });
}

// 文章详情页删除功能
exports.handleDeleteTopic = (req, res, next) => {
    const body = req.params.TopicId;
    mTopic.DeleteTopic(body, (err, results) => {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });  
}

// 文章详情页编辑功能
// 读取
exports.showEditTopic = (req, res, next) => {
    const body = req.params.TopicId;
    mTopic.EditTopicShow(body, (err, results) => {
        if (err) {
            return next(err);
        }
        res.render("topic/edit.html", {
            list: results[0]
        });
    })
}
// 编辑
exports.handleEditTopic = (req, res, next) => {
    const topicID = req.params.TopicId;
    const body = req.body;
    mTopic.EditTopic(body, topicID, (err, results) => {
        if (err) {
            return next(err);
        }
        res.send({
            code: 200,
            msg: '编辑成功'
        })
    })
}
