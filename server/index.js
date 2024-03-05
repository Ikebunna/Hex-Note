import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDB from "./config/db.js";
import noteRoutes from "./routes/noteRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

const app = express(); // main thing
app.use(express.json()); // to accept json data
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  "https://note-l9x8.vercel.app",
  "https://hex-note.vercel.app",
  "http://localhost:5175",
  "http://localhost:5173",
  "http://localhost:5174",
];
// middleware
app.use(function (req, res, next) {
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type, authorization"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

connectDB();

// --------------------------deployment------------------------------
// const __dirname = path.resolve();

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "/frontend/build")));

//   app.get("*", (req, res) =>
//     res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
//   );
// } else {
//   app.get("/", (req, res) => {
//     res.send("API is running..");
//   });
// }
// --------------------------deployment------------------------------
app.use("/api/notes", noteRoutes);
app.use("/api/users", userRoutes);

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}..`
  )
);
