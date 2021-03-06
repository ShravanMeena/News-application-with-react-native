import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import Users from "./data/User.js";
import NewsData from "./data/NewsData.js";

import User from "./models/userModel.js";
import News from "./models/newsModels.js";

import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await News.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(Users);

    const adminUser = createdUsers[0]._id;
    const samleData = NewsData.map((news) => {
      return { ...news, author: adminUser };
    });

    await News.insertMany(samleData);

    console.log("Data imported succcessfully!".green.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

// const destroyData = async () => {
//   try {
//     await Order.deleteMany();
//     await Product.deleteMany();
//     await User.deleteMany();

//     console.log("Data destroy!!!".red.inverse);
//     process.exit();
//   } catch (error) {
//     console.log(`${error}`.red.inverse);
//     process.exit(1);
//   }
// };

// if (process.argv[2] === "-d") {
//   destroyData();
// } else {
//   importData();
// }
importData();
