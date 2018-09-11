import { Router } from "express";

import {
    userSuggestedResources,
    userAppliedResources,
    currentUser
} from "../controllers/user.controller";

const userRouter = Router();

userRouter
    .get("/current", currentUser)
    .get("/apps", userAppliedResources)
    .get("/suggested", userSuggestedResources);

export default userRouter;
