import express from "express";
import { getTestData } from "../controllers/testController.js";
// import { protectRoute } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/").get(getTestData);

export default router;
