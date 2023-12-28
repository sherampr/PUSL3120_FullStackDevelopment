const express=require('express')

//express app
const app=express()


const workoutRoutes=require('./routes/workouts')


require('dotenv').config()

//middleware
app.use(express.json())

app.use((req,res,next)=>{

    console.log(req.path,req.method)
    next()

    
})

//routes
app.use('/api/workouts/', workoutRoutes);

//listening for requests
app.listen(process.env.PORT,()=>{

  console.log("listening on port",process.env.PORT)

})