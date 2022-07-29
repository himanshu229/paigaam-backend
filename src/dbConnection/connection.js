const mongoose = require("mongoose");
require("dotenv").config();

const connection = async () => {
  try {
    await mongoose.connect(`${process.env.DATABASE_URL}`);
    throw "Database connection is successfully";
  } catch (error) {
    console.log(error);
  }
};

connection();
