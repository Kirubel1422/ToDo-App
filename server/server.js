require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const URI = "mongodb://localhost:27017/todo";
const connect = async () => {
  try {
    await mongoose.connect(URI);
  } catch (error) {
    console.error(error);
  }
};

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

connect();
const router = require("./routes/route");
app.use("/todo", router);

app.listen(process.env.PORT, () => {
  console.log(`Server is connected to ${process.env.PORT}`);
});
