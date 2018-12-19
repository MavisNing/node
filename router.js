// 路由模块

// 1. 导包
const express = require('express');
const cUser = require('./controllers/c-user');
const cTopic = require('./controllers/c-topic');

// 2. 实例化路由对象
const router = express.Router();

// 3. 配置路由

// 渲染登录页
router.get('/signin', cUser.showLogin)
      .post('/signin', cUser.handleLogin)
      .get('/', cTopic.showIndex)
      .get('/topic/create', cTopic.showCreateTopic)
      .post('/createTopic', cTopic.handleTopicCreat)
      .get('/signout', cUser.showSingnOut)
      .get('/detail/topic/:TopicId', cTopic.showTopic)
      .get('/topic/:TopicId/delete', cTopic.handleDeleteTopic)
      .get('/topic/:TopicId/edit', cTopic.showEditTopic)
      .post('/topic/edit/:TopicId', cTopic.handleEditTopic)
      .get('/signup', cUser.showSignup)
      .post('/signup', cUser.handleSignup);

// 4. 导出路由对象
module.exports = router;