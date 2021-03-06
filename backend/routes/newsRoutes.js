import express from "express";
import {
  createNews,
  getnews,
  getNewsById,
  newsDeleteById,
  updateNewsById,
  newsDisLikeController,
  newsLikeController,
  commentController,
  commentLikeController,
  searchNewsByCategory,
  searchNewsByTitle,
  deleteCommentController,
} from "../controllers/newsController.js";
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
      filepath: req.file.filename,
    });
  } catch (err) {
    res.send(400);
  }
});

router.route("/").post(protectRoute, createNews);
router.route("/").get(getnews);
router.route("/:id").get(getNewsById);
router.route("/:id").put(updateNewsById);
router.route("/:id").delete(protectRoute, newsDeleteById);

router.route("/like/success").put(protectRoute, newsLikeController);
router.route("/dislike/success").put(protectRoute, newsDisLikeController);

router.put("/comment/create", protectRoute, commentController);
router.put("/comment/delete", protectRoute, deleteCommentController);
// router.put("/comment/get",  getCommentCon);
router.put("/comment/like", protectRoute, commentLikeController);

// basic search
// router.post("/u/search", async (req, res) => {
//   const allTasks = await News.find({ title: req.body.query });
//   if (!allTasks || allTasks.length === 0)
//     res.status(400).send({ error: "No task was found" });
//   res.status(200).send(allTasks);
// });

// search by category
router.route("/find/:category").get(searchNewsByCategory);

// search by title
router.route("/findbytitle/:title").get(searchNewsByTitle);

export default router;
