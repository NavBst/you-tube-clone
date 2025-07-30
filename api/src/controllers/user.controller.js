import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log(email)

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        status: false, 
        error: { message: 'Email already registered' } 
      });
    }

    // Create new user
    const newUser = await User.create({
      username, 
      email,
      password, // In production, hash the password before saving
    });

    // Generate token for auto-login
    const token = jwt.sign({ userId: newUser._id }, "hidden", { expiresIn: "1d" });

    const response = {
      status: true,
      message: "Registered Successfully!",
      user: {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        avatar: newUser.avatar
      },
      accessToken: token
    };
    return res.status(200).json(response);
  } catch (er) {
    return res.status(500).json({ 
      status: false, 
      error: { message: er.message || 'Registration failed' } 
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email)
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ 
        status: false, 
        error: { message: 'User not found' } 
      });
    }


    if (user.password !== password) {
      return res.status(401).json({ 
        status: false, 
        error: { message: 'Invalid password' } 
      });
    }

    // Create token
    const token = jwt.sign({ userId: user._id }, "hidden", { expiresIn: "60m" });

    return res.status(200).json({
      status: true,
      message: "Logged in successfully!",
      user,
      accessToken: token,
    });
  } catch (er) {
    return res.status(500).json({ 
      status: false, 
      error: { message: er.message || 'Login failed' } 
    });
  }
};
