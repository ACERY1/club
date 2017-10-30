/**
 * Created by Acery on 2017/10/27.
 */
import * as express from "express";
import * as compression from "compression";  // compresses requests
import * as session from "express-session";
import * as bodyParser from "body-parser";
import * as logger from "morgan";
import * as errorHandler from "errorhandler";
import * as lusca from "lusca";
import * as dotenv from "dotenv";
import * as mongo from "connect-mongo";
import * as flash from "express-flash";
import * as path from "path";
import * as mongoose from "mongoose";
import * as passport from "passport";
import expressValidator = require("express-validator");

/**
 * express server
 */
const app = express();
const port = process.env.PORT || 3000;

/**
 * db connetction
 */
mongoose.connect(process.env.mongodbURI);

mongoose.connection.on('error', () => {
    console.log('mongodb connection error!')
});

mongoose.connection.on('open', () => {
    console.log('mongodb connection success')
});

/**
 * Controllers
 */
import * as userController from './controllers/user'


/**
 * express global configuration
 */
app.set("views", path.join(__dirname, "../views"));  // 绑定MVC中的View层
app.set("view engine", "pug");  // 使用渲染引擎
app.use(logger("dev"));  // 使用express 自带 logger -Morgan /*dev common combined short tiny*/
app.use(bodyParser.json());  // 处理http请求body里的application/json数据
app.use(bodyParser.urlencoded({extended: false}));  // for application/x-www-form-urlencoded
app.use(express.static(path.join(__dirname, "public"), {maxAge: 31557600000})); // 使用express静态转发，/js将转发到/public/js
// app.use(expressValidator());
app.use(session({
    resave: true,  // 同客户端并行请求是否允许覆盖
    saveUninitialized: true,  // 初始化session时是否保存到存储
    secret: "clubSession"
}));
app.use(flash());


/**
 * express router configuration
 */
app.get('/', (req, res) => {
    res.render('home',{name:req.session.name||'no login'})
});
app.post('/login', userController.postLogin);

app.get('*', (req, res) => {
    res.end('fucking error')
}); // 404处理


/*error handle*/
app.use(errorHandler());

/**
 * start server port
 */
app.listen(port, () => {
    console.log(`server listen at ${port}`)
});



