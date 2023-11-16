import express from "express";
import {
  users,
  usersUpdate,
  userDelete,
  getUserListing,
  getUser,
} from "../controller/userControllers.js";
// import { usersUpdate } from "../controller/userControllers.js";
import { veriFyToken } from "../utils/userVeriFy.js";

const router = express.Router();
router.get("/user", users);
router.post("/update/:id", veriFyToken, usersUpdate);
router.delete("/delete/:id", veriFyToken, userDelete);
router.get("/listing/:id", veriFyToken, getUserListing);
router.get("/:id", veriFyToken, getUser);
export default router;
