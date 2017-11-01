/**
 * Created by Acery on 2017/10/29.
 */
import  User from '../models/User'
import Id from '../models/Ids'
import {Request, Response, NextFunction} from 'express'
const request = require("express-validator");

export let postLogin = (req: Request, res: Response, next: NextFunction) => {
    req.assert("username", "Email is not valid").isEmail();
    // req.assert("password",)
    // req.session.name=req.body.username;
    const errors = req.validationErrors();

    // console.log(errors)
    if (errors) {
        req.flash("errors", errors); // errors 被包装进messages里
        return res.redirect("/");
    }
    const user = new User({
        emailAddress: req.body.username,
        password: req.body.password,
        id: 1,
        name: 'default',

    });

    // user.save((d1,d2)=>{
    // })


    res.end("ok")

};

export let postRegister = (req: Request, res: Response, next: NextFunction) => {
    /*验证字段*/
    req.assert('email', 'Email is not valid').isEmail();
    req.assert('username', 'Username is not valid,length must be 6~16').isLength({min: 6, max: 16});
    req.assert('rePassword', 'password not the same').equals(req.body.password);
    const errors = req.validationErrors();

    /*如果上述验证不通过，结果会被赋给errors*/
    if (errors) {
        req.flash('errors', errors);
        return res.redirect('/register');
    }

    // id.findAndModify({update:{$inc:{'id':1}}, query:{"name":"user"}});
    User.findOne({'emailAddress':req.body.email},(err,existUser)=>{
        if(err){return next(err)}
        if(existUser){
            req.flash("errors",{msg:"email has been registered"});
            return res.redirect('/register');
        }
    });


    // id.save((err)=>{
    //     if(err){
    //         /*Server] { ValidationError: ID validation failed: id: Path `id` (0) is less than minimum allowed value (3).
    //          [Server]   errors:
    //          [Server]    { id:
    //          [Server]       { ValidatorError: Path `id` (0) is less than minimum allowed value (3).
    //          [Server]         message: 'Path `id` (0) is less than minimum allowed value (3).',
    //          [Server]         name: 'ValidatorError',
    //          [Server]         properties: [Object],
    //          [Server]         kind: 'min',
    //          [Server]         path: 'id',
    //          [Server]         value: 0,
    //          [Server]         reason: undefined,
    //          [Server]         '$isValidatorError': true } },
    //          [Server]   _message: 'ID validation failed',
    //          [Server]   name: 'ValidationError' }
    //          */
    //         return res.redirect('/register');
    //
    //     }
    //     res.end('ok')
    //
    // });
    /**
     * 1.查询邮箱是否已经存在数据库
     *
     */
    console.log(req.body);

};

/*[Server] { email: '841034081@qq.com',
 [Server]   username: 'w1w2w',
 [Server]   password: 'dsada',
 [Server]   rePassword: 'dasdas' }
 */