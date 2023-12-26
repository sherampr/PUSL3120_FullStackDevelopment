const express=require('express');

const mongoose=require('mongoose')

//express app
const app=express()

const workoutRoutes= require('./routes/workouts')



//middlewear
app.use(express.json())

app.use((req,res,next)=>{
   console.log(req.path,req.method)
   next()

})

//routes
app.use('/api/workouts',workoutRoutes)


//connect to the db
mongoose.connect(process.env.MONGO_URI)
 .then(()=>{

    //listen for requests
app.listen(process.env.PORT,()=>{

    console.log('listening on port and connect to MONGO db',process.env.PORT);
})



 })
 .catch((error)=>{
    console.log(error)
 })



