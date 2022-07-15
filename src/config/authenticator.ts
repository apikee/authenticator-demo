import { Authenticator } from "@apikee/authenticator";
import { environment } from "./environment";

export const { createAccess, validateAccess, refreshAccess, revokeAccess } =
  new Authenticator({
    accessKey: environment.accessSecretKey,
    refreshKey: environment.refreshSecretKey,
  });
