import { User } from "../Models/userModels.js";
import bcrypt from "bcryptjs";
import { ErrorHandler } from "../utils/error.js";
import JWT from "jsonwebtoken";
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashPass = bcrypt.hashSync(password, 12);
  const newUser = new User({ username, email, password: hashPass });
  try {
    await newUser.save();
    res.status(201).json("User Created SuccessFully");
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const Validusers = await User.findOne({ email: email });
    if (!Validusers) return next(ErrorHandler(404, "User not Found"));
    const isValidPassword = bcrypt.compareSync(password, Validusers.password);
    if (!isValidPassword) return next(ErrorHandler(401, "Wrong Credentials!"));

    const token = JWT.sign({ id: Validusers._id }, process.env.SECRET_KEY);
    const { password: passw, ...rest } = Validusers._doc;
    res.cookie("token", token, { httpOnly: true }).status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const googleAuth = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = JWT.sign({ id: user._id }, process.env.SECRET_KEY);
      const { password: passw, ...reset } = user._doc;
      res.cookie("token", token, { httpOnly: true }).status(200).json(reset);
    } else {
      const genPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashPass = bcrypt.hashSync(genPassword, 10);
      const newUser = new User({
        username: req.body.name.split(" ").join("").toLowerCase(),
        // Math.random().toString(36).slice(-5),
        email: req.body.email,
        password: hashPass,
        avatar: req.body.photo,
      });
      await newUser.save();
      const token = JWT.sign({ id: newUser._id }, process.env.SECRET_KEY);
      const { password: passw, ...reset } = newUser._doc;
      res.cookie("token", token, { httpOnly: true }).status(200).json(reset);
    }
  } catch (error) {
    next(error);
  }
};

export const userSignout = async (req, res, next) => {
  try {
    res.clearCookie("token");
    res.status(200).json("User has been Logged Out");
  } catch (error) {
    next(error);
  }
};
