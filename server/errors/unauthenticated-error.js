import { StatusCodes } from "http-status-codes";
import CustomAPIError from "./custom-api.js";

class UnauthenticatedError extends CustomAPIError {
  constructor() {
    super(message);
    this.status = StatusCodes.UNAUTHORIZED;
  }
}

export default UnauthenticatedError;
