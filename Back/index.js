const express = require('express')
const morgan = require('morgan')
const createError = require('http-errors')
require('dotenv').config()
require('./helpers/init_mongodb.js')
const cors = require('cors')

const app = express();
app.use(cors())
app.use(morgan('dev'))   
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use('/dos&donts', require('./Routes/dos&donts.route'))
app.use('/prerequisits', require('./Routes/prerequisits.route'))
app.use('/questions', require('./Routes/questions.route'))
app.use('/terms&conditions', require('./Routes/terms&conditions.route'))

app.get('/',  async (req,res,next) =>{
    res.send("Welcome to the Admin Control Panel...")
});

app.use(async (req,res,next)=>{  
    next(createError.NotFound('This route does not exist '));

});

app.use((err,req,res,next)=>{
    res.status(err.status || 500)
    res.send({
        error:{
            status: err.status || 500,
            message: err.message,
        }
    })
});


const PORT = process.env.PORT || 4000

app.listen(PORT,() =>{
    console.log(`Server Running on port ${PORT}`)

});