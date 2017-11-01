/**
 * Created by Acery on 2017/10/29.
 */
import  User from '../models/User'
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
        password:req.body.password,
        id:1,
        name:'default',

    });

    // user.save((d1,d2)=>{
    // })




    res.end("ok")

};