const express = require('express');
const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalModel');
const User = require('../models/userModel');


const getGoal = asyncHandler(async (req,res) =>{
     const goals = await Goal.find({user : req.user.id});
    res.status(200).json(goals);
})

const setGoal = asyncHandler(async (req,res) =>{
    if(!req.body.text){
        res.status(400);
        throw new Error("Please add a text field")
    }
    else{
        const goal= await Goal.create({
            text : req.body.text,
            user : req.user.id
        })

        res.status(200).json(goal);
    }
})

const updateGoal = asyncHandler(async (req,res) =>{
    const goal = await Goal.findById(req.params.id)
    if(!goal){
        res.status(400)
        throw new Error("Goal Not found");
    }

    const user = await User.findById(req.user.id)

    //Check for User
    if(!user){
        res.status(400)
        throw new Error("User not found")
    }

    //Make sure the logged user matches the  goal user
    if(goal.user.toString() !== user.id){
        res.status(400)
        throw new Error("User not authorized")
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body,{ new : true})
    res.status(200).json(updatedGoal);
})

const deleteGoal = asyncHandler(async (req,res) =>{
    const goal = await Goal.findById(req.params.id)
    if(!goal){
        res.status(400)
        throw new Error ("Goal is not found")
    }

    const user = await User.findById(req.user.id)

    //Check for User
    if(!user){
        res.status(400)
        throw new Error("User not found")
    }

    //Make sure the logged user matches the  goal user
    if(goal.user.toString() !== user.id){
        res.status(400)
        throw new Error("User not authorized")
    }

    const deletedGoal = await Goal.findByIdAndDelete (req.params.id)
    res.status(200).json(deletedGoal);
})


module.exports = {
    getGoal,
    setGoal,
    updateGoal,
    deleteGoal
}