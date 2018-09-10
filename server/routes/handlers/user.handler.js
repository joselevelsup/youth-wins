import { Router } from "express";

import {
    userSuggestedResources,
    userAppliedResources,
    currentUser,
    appendContent,
    toggleResponse
} from "../controllers/user.controller";

const userRouter = Router();

userRouter
    .get("/current", currentUser)
    .get("/apps", userAppliedResources)
    .get("/suggested", userSuggestedResources);

userRouter.get("/content", appendContent);

userRouter.post("/apps/toggle", toggleResponse);
export default userRouter;
