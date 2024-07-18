import userModel from "../models/userModel.js";

import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //validations
    if (!name) {
      return res.send({ error: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }
    //check user
    const exisitingUser = await userModel.findOne({ email });
    //exisiting user
    if (exisitingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Register please login",
      });
    }
    //register user
    const hashedPassword = await hashPassword(password);
    //save
    const user = await new userModel({
      name,
      email,
      password: hashedPassword,
    }).save();

    //alternative way using create simple way
    // try {
    //   const user = await userModel.create({
    //     name,
    //     email,
    //     phone,
    //     address,
    //     password: hashedPassword,
    //     answer,
    //   });
    //   console.log("User created successfully:", user);
    // } catch (error) {
    //   console.error("Error creating user:", error);
    // }

    //another way but hashed password will not be saved
    // try {
    //   const user = await userModel.create(req.body);
    //   console.log("User created successfully:", user);
    // } catch (error) {
    //   console.error("Error creating user:", error);
    // }

    //same but using save
    // try {
    //   const newUser = new userModel(req.body);
    //   const user = await newUser.save();
    //   console.log("User created successfully:", user);
    // } catch (error) {
    //   console.error("Error creating user:", error);
    // }

    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Errro in Registeration",
      error,
    });
  }
};

//POST LOGIN
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registerd",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    //token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
    // console.log(token) =eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjYwY2ZhNTU1MjMxN2M3YzZlODY3NTciLCJpYXQiOjE3MTc2NzA5MTAsImV4cCI6MTcxODI3NTcxMH0.4q9kv0q0ZEyPrEuvC4hN-fvhusrFG9xJ2qywsWWSAX8
    //format of status
    //     {
    //     "success": true,
    //     "message": "login successfully",
    //     "user": {
    //         "_id": "6660cfa5552317c7c6e86757",
    //         "name": "ankit",
    //         "email": "ankit@gmail.com",
    //         "phone": "123",
    //         "address": "123",
    //         "role": 0
    //     },
    //     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjYwY2ZhNTU1MjMxN2M3YzZlODY3NTciLCJpYXQiOjE3MTc2NzA5MTAsImV4cCI6MTcxODI3NTcxMH0.4q9kv0q0ZEyPrEuvC4hN-fvhusrFG9xJ2qywsWWSAX8"
    // }

    //using online jwt.io for token verification
    //paste and get
    //{ _id: '6660cf7e552317c7c6e86752', iat: 1717672012, exp: 1718276812 }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};
