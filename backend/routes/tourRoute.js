import express from "express";
import { addTour, getAllTours } from "../controllers/tourController.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { upload } from "../uploadFile.js";
const router = express.Router();

router.get("/", getAllTours);
router.post("/", verifyToken, upload.single("image"), addTour);

export default router;
