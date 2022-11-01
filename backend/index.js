import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import authRouter from "./routes/authRoute.js";

const app = express();
app.use(express.json({ extended: true })); // for postman //Used to parse JSON bodies
app.use(cors()); //Middleware for connect server and react (used for server connection with unknown url)
app.use(express.urlencoded({ extended: true })); //for send the data via form //Parse URL-encoded bodies
//app.use(cookieParser()); //  for Set, Get Cookies

const port = 4000;
mongoose
  .connect(process.env.DB_URI)
  .then(console.log("Connection Successfully"))
  .catch((error) => console.log(error));

app.use("/api/auth", authRouter);

// Error Handler Middleware in express
//app.use(errorHandlar);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
