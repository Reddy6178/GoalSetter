const jwt = require ('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');


// @desc Register User
// @route POST/api/users
// @access public

const registerUser = asyncHandler(async(req, res ) =>{
    const {name, email, password } = req.body;
    if(!name || !email || !password){
        res.status(400);
        throw new Error("Please add all the fields");
    }

    //check if user Exists

    const userExists = await User.findOne({email});

    if(userExists){
        res.status(400);
        throw new Error("User already Exists")
    }

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);

    //Create User
    const user = await User.create({
        name,
        email,
        password : hashedPassword
    })

    if(user){
        res.status(201).json({
            _id : user.id,
            name : user.name,
            email : user.email,
            password : user.password,
            token : generateToken(user.id)
        })
    }else{
        res.status(400);
        throw new Error ("Invalid User Details")
    }
})

// @desc Authenticate a  User
// @route POST/api/users/login
// @access public

const loginUser = asyncHandler(async(req, res ) =>{
    const {email, password } = req.body;
    if(!email || !password){
        res.status(400)
        throw new Error("Please fill the email and password")
    }
    //chec for user email
    const user = await User.findOne({email})
    if(user && (await bcrypt.compare(password, user.password))){
        res.status(201).json({
            _id : user.id,
            name : user.name,
            email : user.email,
            token : generateToken(user.id)
        })
    }else{
        res.status(400);
        throw new Error ("Invalid User Credentials")
    }
})

// @desc Get User Data
// @route GET/api/users/me
// @access private

const getMe = asyncHandler(async(req, res ) =>{
    const {_id, name, email }= await User.findById(req.user.id);
    res.status(200).json({
        id : _id,
        name,
        email,
    })
})

const generateToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET, {
        expiresIn : '30d',
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe
}