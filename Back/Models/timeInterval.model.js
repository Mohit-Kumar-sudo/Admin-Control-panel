const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TableSchema = new Schema({
    contentType:{
        type:String
    },
    allotedTime:{
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

const Table = mongoose.model("timeInterval", TableSchema)

module.exports = Table
