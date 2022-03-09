const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("../errors/custom-api");

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.StatusCodes).json({ msg: err.message });
  }

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR);
};

module.exports = errorHandlerMiddleware;
