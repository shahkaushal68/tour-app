import express from "express";
import {
  addTour,
  deleteTour,
  getAllTours,
  getSingleTour,
  getToursBasedOnTag,
  getToursByLoginUser,
  getToursBySearch,
  updateTour,
} from "../controllers/tourController.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { upload } from "../uploadFile.js";
const router = express.Router();

router.get("/", getAllTours);
router.get("/:id", getSingleTour);
router.delete("/:id", deleteTour);
router.get("/search?searchQuery", getToursBySearch);
router.get("/tag/:tag", getToursBasedOnTag);

router.put("/updateTour/:id", verifyToken, upload.single("image"), updateTour);
router.get("/userTours/:id", verifyToken, getToursByLoginUser);
router.post("/", verifyToken, upload.single("image"), addTour);

export default router;
