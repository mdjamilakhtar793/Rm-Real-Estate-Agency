import Listing from "../Models/ListingModels.js";
import { User } from "../Models/userModels.js";
import { ErrorHandler } from "../utils/error.js";
import bcrypt from "bcryptjs";

export const users = (req, res) => {
  res.json({ success: true, message: "Success" });
};
export const usersUpdate = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(ErrorHandler(401, "You can Update on Your Account"));
  try {
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const userDelete = async (req, res, next) => {
  if (req.user.id != req.params.id)
    return next(ErrorHandler(401, "You can only delete your own account !"));
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie("token");
    res.status(200).json("User has been Deleted");
  } catch (error) {
    next(error);
  }
};

export const getUserListing = async (req, res, next) => {
  if (req.user.id === req.params.id) {
    try {
      const listings = await Listing.find({ userRef: req.params.id });
      res.status(200).json(listings);
    } catch (error) {
      next(error);
    }
  } else {
    return next(ErrorHandler(401, "You can only view your own listing"));
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return next(ErrorHandler(404, "No such user found"));
    }
    const { password: pass, ...rest } = user._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
