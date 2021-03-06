import express from "express";
import {
  createCategory,
  getCategories,
} from "../controllers/categoryController.js";
import { protectRoute } from "../middleware/authMiddleware.js";

import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./images/");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

var upload = multer({ storage, fileFilter });
//Upload route
router.post("/upload", upload.single("photo"), (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      filepath: req.file.path,
    });
  } catch (err) {
    res.send(400);
  }
});

router.route("/").post(protectRoute, createCategory);
router.route("/").get(getCategories);

export default router;
