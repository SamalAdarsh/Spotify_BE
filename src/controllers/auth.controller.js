const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async(req,res)=>{

    const {username,email,password,role='user'} = req.body;

    const isUserAlreadyExists = await userModel.findOne({
        $or:[
            username,
            email
        ]
    });

    if(isUserAlreadyExists){
        res.status(409).json({message:'User already exists'});
    }

    const hash = await bcrypt.hash(password,10);

    const user = await userModel.create({
        username,
        email,
        password:hash,
        role
    });

    const token = jwt.sign({
        id:user._id,
        role:user.role
    },process.env.JWT_SECRET)

    const cookies= ("token",token);

    res.status(201).json({
        message:"Welcome to Spotify!",
        user:{
            id:user._id,
            username: user.username,
            email: user.email,
            role: user.role

        }
    })

}