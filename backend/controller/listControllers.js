import Listing from "../Models/ListingModels.js";
import { ErrorHandler } from "../utils/error.js";

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

export const deleteList = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(ErrorHandler(404, "List not found"));
  }
  if (req.user.id !== listing.userRef) {
    return next(ErrorHandler(401, "You you can only delete your own listing"));
  }
  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json("List deleted has been successfully");
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(404, "List not found");
  }
  if (req.user.id !== listing.userRef) {
    return next(ErrorHandler(401, "You can only update your own lists"));
  }
  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(new ErrorHandler(404, "List Not Found"));
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

export const getListings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    let offer = req.query.offer;
    if (offer === undefined || offer === "false") {
      offer = { $in: [false, true] };
    }
    let furnished = req.query.furnished;
    if (furnished === undefined || furnished === "false") {
      furnished = { $in: [false, true] };
    }
    let parking = req.query.parking;
    if (parking === undefined || parking === "false") {
      parking = { $in: [false, true] };
    }
    let type = req.query.type;
    if (type === undefined || type === "all") {
      type = { $in: ["sale", "rent"] };
    }
    const searchTerms = req.query.searchTerms || "";
    const sorts = req.query.sorts || "createdAt";
    const order = req.query.order || "desc";

    const listing = await Listing.find({
      name: { $regex: searchTerms, $options: "i" },
      offer,
      furnished,
      parking,
      type,
    })
      .sort({ [sorts]: order })
      .limit(limit)
      .skip(startIndex);
    return res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};
