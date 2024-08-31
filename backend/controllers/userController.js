import jwt from 'jsonwebtoken'
import validator from 'validator'
import bcrypt, { hashSync } from 'bcrypt'
import userModel from '../models/userModel.js'
import mongoose from 'mongoose'


const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}


const loginUser = async (req,res) => {
    const {password,email} = req.body;
    try {
        const user = await userModel.findOne({email})

        if(!user) {
            return res.json({success: false, message:"User doesn't exists"})
        }

        const isMatch = await bcrypt.compare(password,user.password)

        if (!isMatch) {
            return res.json({success: false, message:"Invalid Credentials"})
        }

        const token = createToken(user._id)
        res.json({success:true, token})

    } catch (error) {
        res.json({success:false, message:'Error'})
        console.log(error)
    }
}

const registerUser = async (req,res) => {
    const {name,password,email, cartData} = req.body;
    try {
        const exists = await userModel.findOne({email})
        if (exists) {
            return res.json({success: false, message:"User already exists"})
        }

        if (!validator.isEmail(email)) {
            return res.json({success:false, message:"Please enter a valid email"})
        }

        if (password.length < 8) {
            return res.json({success:false, message:"Please enter a strong password"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedpwd = await bcrypt.hash(password, salt)

        const newUser = new userModel ({
            name: name,
            email: email,
            password: hashedpwd,
            cartData: cartData
        })

        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({success:true, token})

    } catch (error) {
        res.json({success:false, message:'Error'})
        console.log(error)
    }
}


export {loginUser, registerUser}