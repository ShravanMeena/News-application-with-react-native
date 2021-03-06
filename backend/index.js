import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/db.js";
import TestRoute from "./routes/testRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import newsRoutes from "./routes/newsRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import cors from "cors";
const app = express();
app.use(express.json());

dotenv.config();

connectDB();

app.use(express.static("images"));

app.use(cors({ origin: true, credentials: true }));

app.get("/", (req, res) => {
  return res.send("Welcome");
});

app.use("/test", TestRoute);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/news", newsRoutes);
app.use("/api/v1/category", categoryRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `Server is runing in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
      .bold
  )
);
