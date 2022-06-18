import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import bcript from "bcryptjs";
import {
  BadRequestError,
  CustomAPIError,
  NotFoundError,
  UnauthenticatedError,
} from "../errors/index.js";

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      throw new BadRequestError("Please provide all required fields");
    }

    const userAlReadyExists = await User.findOne({ email });

    if (userAlReadyExists) {
      throw new BadRequestError("User already exists");
    }

    const user = await User.create({
      name,
      email,
      password,
    });
    const token = user.createdJWT();
    res.status(StatusCodes.CREATED).json({
      user: {
        email: user.email,
        lastName: user.lastName,
        location: user.location,
        name: user.name,
      },
      token,
      location: user.location,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide all required fields");
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  // console.log(user);

  const isMatch = await user.comparePassword(password);
  // console.log(isMatch);
  if (!isMatch) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  const token = user.createdJWT();
  user.password = undefined;
  res.status(StatusCodes.OK).json({
    user,
    token,
    location: user.location,
  });
};

const updateUser = async (req, res) => {
  res.send("update");
  // User.fin
};

export { register, login, updateUser };
