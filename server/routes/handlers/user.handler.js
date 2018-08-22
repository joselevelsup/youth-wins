import { Router } from "express";

import {
    getOneUser,
    createUser,
    updateUser,
    deleteUser,
    currentUser
} from "../controllers/user.controller";

const userRouter = Router();

userRouter
    .get("/current", currentUser);

userRouter
    .get("/:userId", getOneUser)
    .post("/", createUser)
    .put("/:userId", updateUser)
    .delete("/:userId", deleteUser);

export default userRouter;
