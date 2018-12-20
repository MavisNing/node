// 1. 导包
const express = require('express');
const router = require('./router');
const bodyParser = require('body-parser');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const morgan = require('morgan');
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
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

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


// 公共成员的使用
// app的一个自带的属性 local
// locals是对象
// app.locals中的成员可以在页面文件html中，通过模板引擎{{}}的语法使用
// 位置：放在session配置后，放在挂载路由前面
// 注意：需要调用next()
app.use((req, res, next) => {
    app.locals.sessionUser = req.session.user;
    next();
});


// 3. 使用路由对象
app.use(router);


// 渲染404页面
app.use((req, res, next) => {
    res.render("404.html");
    next();
});


// 统一处理服务器出错的中间件
app.use((err, req, res, next) => {
    res.send({
        code: 500,
        msg: err.message
    });
})


// 4. 监听端口
app.listen(5000, () => {
    console.log('run it at ---');
})