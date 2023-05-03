const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TableSchema = new Schema({
    deedCategoryEn:{
        type:String
    },
    deedCategoryHi:{
        type:String
    },
    deedTypeEn:{
        type:String
    },
    deedTypeHi:{
        type:String
    },
    instrumentEn:{
        type:String
    },
    instrumentHi:{
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
