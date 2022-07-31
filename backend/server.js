const app = require("./app");
const cloudinary = require("cloudinary");
process.on("uncaughtException", (err) => {
  console.log(`Error : ${err.message}`);
  console.log("Shutting down The Serve Due To Uncaught  Rejection");
  serve.close(() => {
    process.exit(1);
  });
});

//config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}
const connect = require("./config/database");

//connect databse
connect();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});
const serve = app.listen(process.env.PORT, () => {
  console.log(`server is working on http://localhost:${process.env.PORT}`);
});

//unhandled promise rejexction
process.on("unhandledRejection", (err) => {
  console.log(`Error : ${err.message}`);
  console.log("Shutting down The Serve Due To Unhandled Promise Rejection");
  serve.close(() => {
    process.exit(1);
  });
});
