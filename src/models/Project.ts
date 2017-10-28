/**
 * Created by Acery on 2017/10/28.
 */
import * as mongoose from "mongoose";

const projectSchema=new mongoose.Schema({
    name:String,
    id:{type:Number,unique:true},
    startTime:Number,
    endTime:Number,
    reward:Number,
    pics:Array,
    process:Number,
    intro:String,
    require:[
        {
            name:String,
            cont:String,
            process:Number
        }
    ],
    like

})

/*project：{
 name:string,
 id:number,
 startTime:ms,
 endTime:ms,
 reward:number,
 pic:string array,
 process:0|1|2|3|4,
 intro:string,
 require:[
 {
 name:string,
 cont:string,
 process:-1|0|1
 }
 ],
 likeNum:number,
 disLikeNum:number
 }*/