require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

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
app.use(fileUpload());

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
  } catch (error) {}
};

start();
