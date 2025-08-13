import express from 'express';
import jwt from 'jsonwebtoken'
import User from '../models/UserModel.js';

const UserRoute = express.Router();

UserRoute.post("/create", async (req, res) => { 
    try {
        const { username, email, phonenumber, address, password } = req.body;
        const newUser = new User({
            name:username,
            email:email,
            phoneNumber: phonenumber,
            address:address,
            password:password
        });
        const savedUser = await newUser.save();
        res.status(201).json({ message: "User created successfully", user: savedUser });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Failed to create user", error: error.message });
    }
}
);

UserRoute.post("/login", async (req, res) => {
    const {email,password} = req.body;
    const user = await User.findOne({email:email})
    if(!user){
        return res.status(404).send({message:"User with given email does not exist"})
    }
    if(user.password !== password){
        return res.status(401).send({message:"Invalid credentials"})
    }
    const token = jwt.sign({_id:user._id},process.env.JWTPRIVATEKEY,{expiresIn:"7d"})
    
    res.json({message:"user logged in successfully",token})
});

UserRoute.get("/single/:userid", async (req, res) => {
    try {
        const userId = req.params.userid;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ message: "Failed to fetch user", error: error.message });
        
    }
});

export default UserRoute;