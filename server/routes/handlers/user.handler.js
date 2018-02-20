import { Router } from "express";

import {
  getOneUser,
  createUser,
  updateUser,
  deleteUser
} from "../controllers/user.controller";

const userRouter = Router();

userRouter
  .get("/:userId", getOneUser)
  .post("/", createUser)
  .put("/:userId", updateUser)
  .delete("/:userId", deleteUser);

export default userRouter;
