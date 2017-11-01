/**
 * Created by Acery on 2017/10/27.
 */
import * as bcrypt from "bcrypt-nodejs";
import * as crypto from "crypto";
import * as mongoose from "mongoose";
import id from './Ids'

const userSchema = new mongoose.Schema({
    id: {type: Number, unique: true},
    name: {type: String, required: true},
    password: {type: String, required: true},
    emailAddress: {type: String, unique: true},
    gender: Number,
    avatar: String,
    regTime: Number
}, {timestamps: true});


/*user:{
 id:number,
 name:string,
 password:hashString,
 emailAdress:string,
 gender:0|1,
 avatar:string
 }*/

userSchema.pre('save',function () {
   console.log('fuck')
});


const User = mongoose.model("User",userSchema);


export default User;