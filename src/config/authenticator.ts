import { Authenticator } from "@apikee/authenticator";
import { environment } from "./environment";

export const { createAccess, validateAccess, refreshAccess, revokeAccess } =
  new Authenticator({
    accessKey: environment.accessSecretKey,
    refreshKey: environment.refreshSecretKey,
    rejectedAccessHandler: (req, res, next) => {
      return res
        .status(401)
        .json({ message: "You are not authorized to perform this action" });
    },
  });
