import bcrypt from "bcrypt";
import User from "../models/User.model.js";
import jwt  from "jsonwebtoken";

export const userRegAuth = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      res.status(409).json({ error: `user Already exixt with email ${email}` });
    } else {
      const hash = bcrypt.hashSync(password, 10);
      req.body.password = hash;
      next();
    }
  } catch (e) {
    console.error("Password hashing failed:", e);
    return res.status(500).json({ error: "Failed to hash password" });
  }
};

// login authentication
export const userAuthentication = async (req, res, next) => {
  try {
    let { email, password } = req.body;
    const data = await User.findOne({ email });
    if (!data) {
      res.status(404).json({ message: "user not registered!" });
    } else {
      if (!bcrypt.compareSync(password, data.password)) {
        res.status(401).json({ message: "Incorrect Password!" });
      } else {
        req.body = data;
        next();
      }
    }
  } catch (e) {
    res.status(404).json({ error: e });
  }
};

// authorization and jwt.
export const verifyToken = (req, res, next) => {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === 'Bearer'
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1].trim(),
      process.env.JWT_SECRET,
      (er, verifiedToken) => {
        if (er) {
          return res.status(403).json({ message: "Invalid Token" });
        } else {
          req.user = verifiedToken;
          next();
        }
      }
    );
  }
};
