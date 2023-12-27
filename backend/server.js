const express=require('express')

//express app
const app=express()


require('dotenv').config()

//middleware
app.use((req,res,next)=>{

    console.log(req.path,req.method)
    next()

    
})


//routes
app.get('/',(req,res)=>{

    res.json({mssg:'welcome to the app'})

    
})

//listening for requests
app.listen(process.env.PORT,()=>{

  console.log("listening on port",process.env.PORT)

})