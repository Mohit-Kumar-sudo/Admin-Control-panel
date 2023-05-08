const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TableSchema = new Schema({
    questionEn:{
        type:String
    },
    questionHi:{
        type:String
    },
    instrument:{
        type:Object
    },
    partyRole:{
        type:Object
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
