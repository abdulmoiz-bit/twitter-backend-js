import authUser from "../models/authModel.js";
import axios from "axios";
import jwt from "jsonwebtoken";


const createUser = async (req, res) => {
  const { username, name, email, password } = req.body;
  const authUserModel = await authUser.create({
    email,
    password, // TODO: hash this before saving
  });
  console.log("User created", authUserModel);
  await axios.post("http://localhost:5002/api/v1/users", {
    userId: authUserModel._id,
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
    throw new Error("please provide email and passowrd");
  }

  // 2) Check if user exists && password is correct
  // +passoword can not understand
  const user = await authUserModel.findOne({ email }).select("+password");

  // solve this immediately
  /*
  if (!user || !(await user.correctpassword(password, user.password))) {
    throw new Error("incorrect email or password");
  }
  */
  createSendToken(user, 200, res);
};

export { login, createUser };
