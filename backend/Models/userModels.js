import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please Enter your username"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Please Enter your Email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please Enter your correct Password"],
    },
    avatar: {
      type: String,
      default:
        "https://tse4.mm.bing.net/th?id=OIP.Ii15573m21uyos5SZQTdrAHaHa&pid=Api&P=0&h=180",
    },
  },

  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
