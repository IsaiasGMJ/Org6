const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

//crear token JWT
const generateToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET,{
        expiresIn: '30d'
    });
};

//registro de usuario
exports.registerUser = async(req,res)=>{
    const{username,email,password} = req.body;

try{
    const userExist = await User.findOne({email});
    if(userExist){
        return res.status(400).json({msg:'El usuario ya existe'});
    }
    const user = await User.create({username, email, password});
    res.status(201).json({
        _id: user._id,
        username: user.username,
        email:user.email
    });
} catch(error){
    res.status(500).json({message: error.message});
}
};

//login de usuario
exports.loginUser = async(req,res)=>{
    const {email,password} = req.body;

    try{
        const user = await User.findOne({email});
        if(user && (await user.matchPassword(password))){
            res.json({
                _id: user._id,
                username: user.username,
                email:user.email,
                token:generateToken(user._id)
            });
        } else{
            res.status(401).json({ message:'Credenciales invalidas'});
        }
    } catch(error){
        res.status(500).json({message: error.message});
    }
};