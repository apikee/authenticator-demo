import { Router } from "express";

import {
  createAccess,
  revokeAccess,
  refreshAccess,
  validateAccess,
} from "../config/authenticator";
import { userLookup } from "../config/database";

import { pingController } from "./controllers/ping.controller";
import { signUpController } from "./controllers/signUp.controller";
import { signInController } from "./controllers/signIn.controller";
import { signOutController } from "./controllers/signOut.controller";
import { refreshController } from "./controllers/refresh.controller";
import { createTodoController } from "./controllers/createTodo.controller";
import { getTodosController } from "./controllers/getTodos.controller";
import { updateTodoController } from "./controllers/updateTodo.controller";
import { deleteTodoController } from "./controllers/deleteTodo.controller";

export const router = Router();

router.get("/ping", pingController);

router.post("/signUp", createAccess(), signUpController);

router.post("/signIn", createAccess(), signInController);

router.post("/signOut", revokeAccess(userLookup), signOutController);

router.post("/refresh", refreshAccess(userLookup), refreshController);

router.get("/todos", validateAccess(true, userLookup), getTodosController);

router.post("/todos", validateAccess(true, userLookup), createTodoController);

router.put("/todos", validateAccess(true, userLookup), updateTodoController);

router.delete("/todos", validateAccess(true, userLookup), deleteTodoController);
