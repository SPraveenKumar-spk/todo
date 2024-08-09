require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

const URI = process.env.MongoDBURI;
const connectDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Connected the database successfully..");
  } catch (e) {
    console.log(e);
    process.exit(0);
  }
};
app.use(cors());
app.use(express.json());

const router = require("./auth/auth-router");

app.use("/api/auth/", router);
const port = 5000;

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`app is listening at port : ${port}`);
  });
});
