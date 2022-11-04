import express from "express";
import { addTour, getAllTours } from "../controllers/tourController.js";
const router = express.Router();

router.post("/", addTour);
router.get("/", getAllTours);

export default router;
