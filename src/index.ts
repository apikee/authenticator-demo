import express from "express";
import cors from "cors";

import { environment } from "./config/environment";
import { router } from "./api/router";

const app = express();
app.use(cors());

app.use(router);

app.listen(environment.port, () =>
  console.log(
    `Apikee Authenticator Demo is running on port ${environment.port}`
  )
);
