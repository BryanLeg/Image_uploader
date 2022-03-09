const path = require("path");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");

const uploadProductImage = async (req, res) => {
  if (!req.files) {
    throw new BadRequestError("No file Uploaded");
  }

  const productImage = req.files.images;

  // check format
  if (!productImage.mimetype.startsWith("image")) {
    throw new BadRequestError("incorrect MIMTYPE");
  }

  // check size
  const maxSize = 1000;

  // if (productImage.size > maxSize) {
  //   throw new BadRequestError("Please upload image smaller 1kb");
  // }

  const imagePath = path.join(
    __dirname,
    "../public/uploads/" + `${productImage.name}`
  );

  await productImage.mv(imagePath);

  res
    .status(StatusCodes.OK)
    .json({ image: { src: `/uploads/${productImage.name}` } });
};

module.exports = uploadProductImage;
