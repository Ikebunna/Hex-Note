import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import colors from "colors";
import users from "./data/users.js";
import notes from "./data/notes.js";
import User from "./models/userModel.js";
import Note from "./models/noteModel.js";
import connectDB from "./config/db.js";

connectDB();

const importData = async () => {
  try {
    await Note.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    if (createdUsers) {
      // console.log(createdUsers[0]._id.toString(), "created users");
      const adminUser = createdUsers[0]._id.toString();

      const sampleNotes = notes.map((note) => {
        return { ...note, user: adminUser };
      });
      console.log(sampleNotes, "sampleNotes");
      await Note.insertMany(sampleNotes);

      console.log("Data Imported!".green.inverse);
      process.exit();
    }
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Note.deleteMany();
    await User.deleteMany();

    console.log("Data Destroyed!".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
