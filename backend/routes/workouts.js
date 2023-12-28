const express=require('express')

const router=express.Router()


//Get all workouts
router.get("/",(req,res)=>{

    res.json({mssg:"Get all workouts"})
})




//Get a single document
router.get("/:id",(req,res)=>{

     res.json({mssg:"Get a single workout"})


})


//Post a new  workout
router.post("/",(req,res)=>{


    res.json({mssg:"Post a workout"})
})

//Delete a workout
router.delete("/:id",(req,res)=>{


    res.json({mssg:"Delete a workout"})
})

//Update a workout
router.patch("/:id",(req,res)=>{

    res.json({mssg:"update a workout"})
})




module.exports=router;