const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

//imports routes to be accessed from server
const noteRouter = require("./api/notes");

//implementation of use local .env file
require("dotenv").config();

//middleware
app.use(cors());
app.use(express.json());
app.use("/api", noteRouter);

//connect to database
mongoose.connect(
  process.env.MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true, autoIndex: true },
  () => console.log("Connected to DB")
);

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));