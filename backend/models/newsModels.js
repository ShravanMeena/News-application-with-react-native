import mongoose from "mongoose";

const newsSchema = mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },

    urlToImage: {
      type: String,
      required: true,
    },
    content: {
      type: String,
    },

    language: {
      type: String,
    },
    location: {
      type: String,
    },
    country: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    isPopular: {
      type: Boolean,
      default: false,
    },

    isTrend: {
      type: Boolean,
      default: false,
    },

    tags: {
      type: [String],
    },

    comments: [
      {
        comment: String,
        commentedBy: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
        ],
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    likers: [
      {
        type: String,
        ref: "User",
      },
    ],

    isBookmark: {
      type: Boolean,
      default: false,
    },
    category: {
      type: String,
      // required: true,
      default: "general",
    },
  },
  {
    timestamps: true,
  }
);

const News = mongoose.model("News", newsSchema);
export default News;
