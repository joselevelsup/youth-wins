import { Router } from "express";

import {
    userSuggestedResources,
    userAppliedResources,
    currentUser,
    appendContent
} from "../controllers/user.controller";

const userRouter = Router();

userRouter
    .get("/current", currentUser)
    .get("/apps", userAppliedResources)
    .get("/suggested", userSuggestedResources);

userRouter.get("/content", appendContent);

export default userRouter;
