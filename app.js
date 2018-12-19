// 1. 导包
const express = require('express');
const router = require('./router');
const bodyParser = require('body-parser');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'node1'
};
const sessionStore = new MySQLStore(options);


// 2. 实例化app并配置包
var app = express();

// 配置express-art-template包
app.engine('html', require('express-art-template'));
// 配置body-parser包
app.use(bodyParser.urlencoded({
    extended: false
}));
// 配置express-session包
// 配置express-mysql-session
app.use(session({
    key: 'session_cookie_name',
    secret: 'session_cookie_secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}));

// 公开静态资源
app.use("/public", express.static("./public"));
// 公开第三方包资源
app.use("/node_modules", express.static("./node_modules"));


// 3. 使用路由对象
app.use(router);


// 4. 监听端口
app.listen(5000, () => {
    console.log('run it at ---');
})