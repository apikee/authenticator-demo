import { Authenticator } from "@apikee/authenticator";
import { environment } from "./environment";
// import { MongoStore } from "@apikee/authenticator-mongostore";

export const { createAccess, validateAccess, refreshAccess, revokeAccess } =
  new Authenticator({
    accessKey: environment.accessSecretKey,
    refreshKey: environment.refreshSecretKey,
    rejectedAccessHandler: (req, res, next) => {
      return res
        .status(401)
        .json({ message: "You are not authorized to perform this action" });
    },
    // If you want to use persistent token whitelist store, you can use MongoStore
    // from "@apikee/authenticator-mongostore"
    // store: new MongoStore(environment.mongoConnect, {}, () =>
    //   console.log("DB Connected")
    // ),
  });
