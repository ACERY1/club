/**
 * Created by Acery on 2017/10/29.
 */
import * as User from '../models/User'
import {Request, Response, NextFunction} from 'express'
const request = require("express-validator");

export let postLogin = (req: Request, res: Response, next: NextFunction) => {
    // req.assert("username", "Email is not valid").isEmpty();
    // const errors = req.validationErrors();
    // if(errors){
    //     res.end(errors)
    // }
    req.session.name=req.body.username;
    // req.flash("errors");
    res.end("test")
}