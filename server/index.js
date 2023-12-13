require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose')

const app = express()

//DB connection
mongoose.connect(process.env.MONG_URI)
.then(()=>{
    app.listen(process.env.PORT, ()=>{
        console.log("connected to db and listening on port ",process.env.PORT);
    })

})
.catch((error)=>{
    console.log(error)
})

