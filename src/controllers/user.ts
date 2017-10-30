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
        req.flash("errors", errors);
        return res.redirect("/");
    }
    const user = new User({
        emailAddress: req.body.username,
        password:req.body.password,
        id:1,
        name:'default',


        /*    id: {type: Number, unique: true},
         name: {type: String, required: true},
         password: {type: String, required: true},
         emailAddress: {type: String, unique: true},*/
    });

    user.save((d1,d2)=>{
    })
    User.find({},(d1,d2)=>{
        console.log(d1)
        console.log(d2)
        // user.save()
    })


    res.end("ok")

};