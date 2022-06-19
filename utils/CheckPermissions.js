import { UnauthenticatedError } from "../errors/index.js";

const checkPermissions = (requestUser, resourceUserId) => {
  //   console.log(resourceUserId.toString());
  if (requestUser.userId === resourceUserId.toString()) return;
  throw new UnauthenticatedError("You do not have permission to do that");
};

export default checkPermissions;
