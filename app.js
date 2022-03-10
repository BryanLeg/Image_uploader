require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

// cloudinary(ebergeur)
const cloudinary = require('cloudinary').v2
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
})

const fileUpload = require("express-fileupload");

// database
const connectDB = require("./db/connect");

// middlewares
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// product router
const productRouter = require("./routes/ProductRoutes");

app.use(express.static("./public"));
app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));

app.get("/", (req, res) => {
  res.send("salut");
});

// routes
app.use("/api/v1/products", productRouter);

// errors handler
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`server is now listening to port:${PORT}`);
    });
  } catch (error) { }
};

start();
