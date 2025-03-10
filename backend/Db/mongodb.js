const mongoose = require("mongoose");

mongoose.set("bufferTimeoutMS", 20000);
const mongoDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("connected to mongos");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = mongoDb;
