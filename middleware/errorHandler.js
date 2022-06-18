import { StatusCodes } from "http-status-codes";

const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);
  const defaultError = {
    statusCodes: StatusCodes.INTERNAL_SERVER_ERROR,
    msg: "Something went wrong, Try again later",
  };
  res.status(defaultError.statusCodes).json({ msg: err });
};

export default errorHandlerMiddleware;
