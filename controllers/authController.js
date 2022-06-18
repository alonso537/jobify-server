import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  CustomAPIError,
  NotFoundError,
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
    res.status(StatusCodes.CREATED).json({ user });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res) => {
  res.send("Login ");
};

const updateUser = async (req, res) => {
  res.send("update");
};

export { register, login, updateUser };
