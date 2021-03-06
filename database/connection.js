const mongoose = require("mongoose");

const connectDB = (url) => {
  return mongoose.connect(url, {});
};
mongoose.connection.on("connected", () => {
  console.log("๐๐๐Mongo has connected succesfully๐๐๐");
});
mongoose.connection.on("reconnected", () => {
  console.log("Mongo has reconnected");
});
mongoose.connection.on("error", (error) => {
  console.log("Mongo connection has an error", error);
  mongoose.disconnect();
});
mongoose.connection.on("disconnected", () => {
  console.log("Mongo connection is disconnected");
});

module.exports = connectDB;
