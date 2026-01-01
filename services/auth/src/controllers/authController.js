import authUser from "../models/authModel";
import axios from "axios";
import jwt from "jsonwebtoken";


const createUser = async (req, res) => {
  const { username, name, email, password } = req.body;
  const authUser = await authUser.create({
    email,
    password, // TODO: hash this before saving
  });
  console.log("User created", authUser);
  await axios.post("http://localhost:5002/api/v1/users", {
    userId: authUser._id,
    username,
    name,
  });
  createSendToken(authUser, 201, res);
  //return res.json(user);
};

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (authUser, statusCode, res) => {
  const token = signToken(authUser._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  //if(process.env.NODE_ENV === 'production') cookieOptions.secure = true;
  res.cookie("jwt", token, cookieOptions);

  authUser.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      authUser,
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
  const user = await authUser.findOne({ email }).select("+password");

  // solve this immediately
  /*
  if (!user || !(await user.correctpassword(password, user.password))) {
    throw new Error("incorrect email or password");
  }
  */
  createSendToken(user, 200, res);
};

export { login, createSendToken, createUser };
