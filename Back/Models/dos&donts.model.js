const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TableSchema = new Schema({
    module:{
        type:String
    },
    content_english:{
        type:String
    },
    content_hindi:{
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

const Table = mongoose.model("dos&donts", TableSchema)

module.exports = Table
