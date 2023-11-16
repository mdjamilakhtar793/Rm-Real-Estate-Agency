import express from "express";
import {
  createListing,
  deleteList,
  updateListing,
  getListing,
  getListings,
} from "../controller/listControllers.js";
import { veriFyToken } from "../utils/userVeriFy.js";

const router = express.Router();

router.post("/create", veriFyToken, createListing);
router.delete("/delete/:id", veriFyToken, deleteList);
router.post("/update/:id", veriFyToken, updateListing);
router.get("/get/:id", getListing);
router.get("/get", getListings);

export default router;
