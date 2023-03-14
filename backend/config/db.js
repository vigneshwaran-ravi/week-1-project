const mongoose = require("mongoose");
require("dotenv").config();

const MONGODBURI = process.env.DB_URL || "mongodb://127.0.0.1:27017";

const db = async () => {
  try {
    // const connect = await mongoose.connect(MONGODBURI);
    //  `${MONGODBURI}/BookdetaILS
    const connect = await mongoose.connect(MONGODBURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(
      `Mongo Db Connected Successfully to port: ${connect?.connection?.port}`
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = { db };
