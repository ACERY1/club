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
 * express router config
 */
app.get('/',(req,res)=>{
    res.send("hello2")
});


/**
 * start server port
 */
app.listen(port,()=>{
    console.log(`server listen at ${port}`)
});



