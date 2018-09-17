import { Router } from "express";

import {
    userSuggestedResources,
    userAppliedResources,
    currentUser,
    appendContent,
    toggleResponse,
    deleteUserApplication
} from "../controllers/user.controller";

const userRouter = Router();

userRouter
    .get("/current", currentUser)
    .get("/apps", userAppliedResources)
    .get("/suggested", userSuggestedResources);

userRouter.get("/content", appendContent);

userRouter.post("/apps/toggle", toggleResponse);

userRouter.delete("/apps", deleteUserApplication);
export default userRouter;
