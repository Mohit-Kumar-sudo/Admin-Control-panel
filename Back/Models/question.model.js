const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TableSchema = new Schema({
    deedCategory:{
        type:String
    },
    deedType:{
        type:String
    },
    instrument:{
        type:String
    },
    partRole:{
        type:String
    },
    question_english:{
        type:String
    },
    question_hindi:{
        type:String
    },
    is_active: {
        type: Boolean,
        default: true
    },
    created_at: String,
    updated_at: String,
    created_by: String,
    updated_by: String,
})

const Table = mongoose.model("questions", TableSchema)

module.exports = Table
