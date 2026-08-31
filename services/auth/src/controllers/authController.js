import authUser from "../models/authModel.js";
import axios from "axios";
import crypto from "crypto";
import jwt from "jsonwebtoken";

/*
const hashPassword = (password) => {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 100000, 64, "sha512")
    .toString("hex");
  return `${salt}:${hash}`;
};
*/
/*
const comparePassword = (candidatePassword, storedPassword) => {
  if (!candidatePassword || !storedPassword) return false;

  if (storedPassword === candidatePassword) return true;

  const [salt, hash] = storedPassword.split(":");
  if (!salt || !hash) return false;

  const candidateHash = crypto
    .pbkdf2Sync(candidatePassword, salt, 100000, 64, "sha512")
    .toString("hex");

  return candidateHash === hash;
};
*/
const createUser = async (req, res) => {
  const { username, name, email, password } = req.body;
  //const normalizedEmail = email.toLowerCase();
  //const hashedPassword = hashPassword(password);
  const authUserModel = await authUser.create({
    email: email,
    password: password,
  });
  console.log("User created", authUserModel);
  await axios.post("http://localhost:5002/api/v1/users", {
    userId: authUserModel._id,
    email,
    username,
    name,
  });
  createSendToken(authUserModel, 201, res);
  //return res.json(user);
};

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};


const createSendToken = (authUserModel, statusCode, res) => {
  // this is edited
   if (!authUserModel || !authUserModel._id) {
    return res.status(401).json({
      status: "fail",
      message: "Incorrect email or password",
    });
  }

  const token = signToken(authUserModel._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  //if(process.env.NODE_ENV === 'production') cookieOptions.secure = true;
  res.cookie("jwt", token, cookieOptions);

  authUserModel.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      authUserModel,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return res.status(400).json({
      status: "fail",
      message: "Please provide email and password",
    });
  }

  // 2) Check if user exists && password is correct
  //const normalizedEmail = email.toLowerCase();
  const user = await authUser.findOne({ email }).select("+password");

  if (!user) {
    return res.status(401).json({
      status: "fail",
      message: "Incorrect email or password",
    });
  }

  /*
  if (user.password && !comparePassword(password, user.password)) {
    return res.status(401).json({
      status: "fail",
      message: "Incorrect email or password",
    });
  }
  */

  createSendToken(user, 200, res);
};

export { login, createUser };
