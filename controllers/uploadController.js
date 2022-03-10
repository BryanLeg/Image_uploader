const path = require("path");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");
const cloudinary = require('cloudinary').v2
const fs = require('fs')

const uploadProductImageLocal = async (req, res) => {
  if (!req.files) {
    throw new BadRequestError("No file Uploaded");
  }

  const productImage = req.files.images;

  // check format
  if (!productImage.mimetype.startsWith("image")) {
    throw new BadRequestError("incorrect MIMETYPE");
  }

  // check size
  const maxSize = 1000;

  if (productImage.size > maxSize) {
    throw new BadRequestError("Please upload image smaller 1kb");
  }

  const imagePath = path.join(
    __dirname,
    "../public/uploads/" + `${productImage.name}`
  );

  await productImage.mv(imagePath);

  res.status(StatusCodes.OK).json({ image: { src: `/uploads/${productImage.name}` } });
};

const uploadProductImage = async (req, res) => {
  const result = await cloudinary.uploader.upload(req.files.image.tempFilePath, {
    use_filename: true,
    folder: "file-upload"
  })

  fs.unlinkSync(req.files.image.tempFilePath)

  res.status(StatusCodes.OK).json({ image: { src: result.secure_url } })
}

module.exports = uploadProductImage;
