import asyncHandler from "express-async-handler";
import News from "../models/newsModels.js";

const createNews = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    content,
    category,
    urlToImage,
    urlForVideo,
    language,
    country,
    location,
    isAdmin,
    isPopular,
    isTrend,
    isFeatured,
    tags,
  } = req.body;

  const news = new News({
    author: req.user._id,
    title,
    description,
    urlToImage,
    urlForVideo,
    content,
    category,
    location,
    language,
    country,
    isAdmin,
    isPopular,
    isTrend,
    isFeatured,
    tags,
  });
  const createNews = await news.save();
  res.status(201).json(createNews);
});

const getnews = asyncHandler(async (req, res) => {
  const news = await News.find({}).populate("comments.commentedBy", "_id name");
  res.json(news);
});

const getNewsById = asyncHandler(async (req, res) => {
  const news = await News.findById(req.params.id);
  if (news) {
    res.status(200).json(news);
  } else {
    res.status(404);
    throw new Error("news not found");
  }
});

const updateNewsById = asyncHandler(async (req, res) => {
  const news = await News.findById(req.params.id);

  if (news) {
    // news.author = req.body.author || news.author;
    news.title = req.body.title || news.title;
    news.description = req.body.description || news.description;
    news.urlToImage = req.body.urlToImage || news.urlToImage;
    news.content = req.body.content || news.content;
    news.category = req.body.category || news.category;
    news.language = req.body.language || news.language;
    news.country = req.body.country || news.country;

    news.isBookmark = req.body.isBookmark || news.isBookmark;
    news.isFeatured = req.body.isFeatured || news.isFeatured;
    news.isPopular = req.body.isPopular || news.isPopular;
    news.isTrend = req.body.isTrend || news.isTrend;

    const updateNews = await news.save();
    res.json({
      id: updateNews._id,
      author: updateNews.author,
      title: updateNews.title,
      description: updateNews.description,
      urlToImage: updateNews.urlToImage,
      content: updateNews.content,
      category: updateNews.category,
      language: updateNews.language,
      country: updateNews.country,
      isBookmark: updateNews.isBookmark,
      isFeatured: updateNews.isFeatured,
      isTrend: updateNews.isTrend,
      isPopular: updateNews.isPopular,
    });
  }
});

const newsDeleteById = asyncHandler(async (req, res) => {
  News.findByIdAndDelete(req.params.id)
    .then(() => res.json("ews deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

const searchNewsByCategory = asyncHandler(async (req, res) => {
  var regex = await new RegExp(req.params.category, "i");
  News.find({ category: regex }).then((result) => {
    res.status(200).json({ result });
  });
});

const searchNewsByTitle = asyncHandler(async (req, res) => {
  var regex = await new RegExp(req.params.title, "i");
  News.find({ title: regex }).then((result) => {
    res.status(200).json({ result });
  });
});

const newsLikeController = asyncHandler(async (req, res) => {
  News.findByIdAndUpdate(
    req.body.id,
    {
      $push: { likers: req.user._id },
    },
    {
      // real time update
      new: true,
    }
  ).exec((err, result) => {
    if (err) {
      return res.status(400).json({ err });
    }
    return res.json({
      result,
    });
  });
});

const newsDisLikeController = (req, res) => {
  News.findByIdAndUpdate(
    req.body.id,
    {
      $pull: { likers: req.user._id },
    },
    {
      // real time update
      new: true,
    }
  ).exec((err, result) => {
    if (err) {
      return res.status(400).json({ err });
    }
    return res.json({
      result,
    });
  });
};

const commentController = (req, res) => {
  const comment = {
    comment: req.body.comment,
    commentedBy: req.user._id,
  };
  News.findByIdAndUpdate(
    req.body.id,
    {
      $push: { comments: comment },
    },
    {
      // real time update
      new: true,
    }
  )
    .populate("comments.commentedBy", "_id name")
    .exec((err, result) => {
      if (err) {
        return res.status(400).json({ err });
      }
      return res.json({
        result,
      });
    });
};

const deleteCommentController = (req, res) => {
  const comment = {
    _id: req.body.id_comment,
    // commentedBy: req.user._id,
  };
  News.findByIdAndUpdate(
    req.body.id_news,
    {
      $pull: { comments: comment },
    },
    {
      // real time update
      new: true,
    }
  )
    .populate("comments.commentedBy", "_id name")
    .exec((err, result) => {
      if (err) {
        return res.status(400).json({ err });
      }
      return res.json({
        result: comment,
      });
    });
};

const commentLikeController = (req, res) => {
  Post.findByIdAndUpdate(
    req.body.id,
    {
      $push: { "comments[0].likers": req.user._id },
    },
    {
      // real time update
      new: true,
    }
  ).exec((err, result) => {
    if (err) {
      return res.status(400).json({ err });
    }
    return res.json({
      result,
    });
  });
};

export {
  createNews,
  getnews,
  getNewsById,
  updateNewsById,
  newsDeleteById,
  searchNewsByCategory,
  searchNewsByTitle,
  newsLikeController,
  newsDisLikeController,
  commentController,
  commentLikeController,
  deleteCommentController,
};
