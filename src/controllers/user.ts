/**
 * Created by Acery on 2017/10/29.
 */
import  User from '../models/User'
import Id from '../models/Ids'
import {Request, Response, NextFunction} from 'express'
const request = require("express-validator");

export let postLogin = (req, res, next: NextFunction) => {
    req.assert('email','email is valid').isEmail();
    // req.assert('password','passowrd not empty').isEmpty();

    const errors = req.validationErrors();

    if (errors) {
        req.flash('errors', errors);
        return res.redirect('/login');
    }

    User.findOne({emailAddress: req.body.email}, 'password avatar name', (err, user) => {
        if (err) {
            req.flash('errors', {msg: err._message});
            return res.redirect('/login');
        }

        if(!user){
            req.flash('errors', {msg:"the user is not exist"});
            return res.redirect('/login');
        }

        if (user.password == req.body.password) {
            req.session.userInfo = {
                avatar: user.avatar,
                name: user.name
            };
            res.redirect('/homepage');

        } else {
            req.flash('errors', {msg: "wrong password"});
            return res.redirect('/login');
        }
    });


    // req.assert("username", "Email is not valid").isEmail();
    // // req.assert("password",)
    // // req.session.name=req.body.username;
    // const errors = req.validationErrors();


    // console.log(errors)
    // if (errors) {
    //     req.flash("errors", errors); // errors 被包装进messages里
    //     return res.redirect("/");
    // }
    // const user = new User({
    //     emailAddress: req.body.username,
    //     password: req.body.password,
    //     id: 1,
    //     name: 'default',
    //
    // });

    // user.save((d1,d2)=>{
    // })


    // res.end("ok")

};

export let postRegister = (req, res, next: NextFunction) => {
    /*验证字段*/
    req.assert('email', 'Email is not valid').isEmail();
    req.assert('username', 'Username is not valid,length must be 4~16').isLength({min: 4, max: 16});
    req.assert('rePassword', 'password not the same').equals(req.body.password);
    const errors = req.validationErrors();

    /*如果上述验证不通过，结果会被赋给errors*/
    if (errors) {
        req.flash('errors', errors);
        return res.redirect('/register');
    }

    // id.findAndModify({update:{$inc:{'id':1}}, query:{"name":"user"}});
    /*根据Email查找是否已经被注册过了*/
    User.findOne({'emailAddress': req.body.email}, (err, existUser) => {
        if (err) {
            return next(err)
        }
        if (existUser) {
            req.flash("errors", {msg: "email has been registered"});
            return res.redirect('/register');
        }

        /*找出id并做自增*/
        Id.findOne({'name': 'user'}, 'id', (err, ID) => {
            if (err) next(err);
            let newId = ID.id + 1;
            let usr = new User({
                id: newId, // id自增
                name: req.body.username,
                password: req.body.password,
                emailAddress: req.body.email
            });

            /*更新Id（主码id自增）*/
            Id.update({'name': 'user'}, {id: newId}, (err) => {
                if (err) next(err);

                usr.save((err) => {
                    if (err) next(err);
                    else {
                        req.flash('info', {msg: "register successfully!"});
                        return res.redirect('/login');
                    }
                })
            });
        });
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
    // console.log(req.body);

};
