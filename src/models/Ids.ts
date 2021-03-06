/**
 * Created by Acery on 2017/11/1.
 */
import * as mongoose from 'mongoose'

const IDSchema = new mongoose.Schema({
    id: {type:Number,min:0},
    name: String,
});

const ID = mongoose.model("ID",IDSchema);

export default ID;