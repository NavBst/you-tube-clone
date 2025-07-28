import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

export const register = async (req, res) => {
  try {
    const data = req.body;
    const { username, email } = req.body;
    const newUser = await User.create(data);
    const { _id } = newUser;
    const response = {
      status: true,
      message: "Registered Successfully!",
      info: {
        _id,
        username,
        email,
      },
    };
    return res.status(200).json(response);
  } catch (er) {
    return res.status(404).json({ error: er });
  }
};

export const login = async (req, res) => {
  try {
    let data = req.body;
    console.log(data);
    const token = jwt.sign({ data }, "hidden", { expiresIn: "60m" });
    console.log(token);
    return res.status(200).json({
      status: true,
      message: "Logged in successully!",
      user: data,
      accessToken: token,
    });
  } catch (er) {
    return res.status(404).json({ error: er });
  }
};
