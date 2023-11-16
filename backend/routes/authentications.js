import express from "express";
import {
  googleAuth,
  signin,
  signup,
  userSignout,
} from "../controller/authConrollers.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google", googleAuth);
router.get("/signout", userSignout);

export default router;
