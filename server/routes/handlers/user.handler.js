import { Router } from "express";

import {
    userSuggestedResources,
    userAppliedResources,
    currentUser,
    appendContent,
    toggleResponse,
    sendForgotPass,
    changePassword,
    deleteUserApplication
} from "../controllers/user.controller";

const userRouter = Router();

userRouter.get("/current", currentUser);

userRouter.get("/apps", userAppliedResources);

userRouter.get("/suggested", userSuggestedResources);

userRouter.get("/content", appendContent);

userRouter.post("/apps/toggle", toggleResponse);

userRouter.post("/forgot", sendForgotPass);

userRouter.post("/forgot/pass", changePassword);

userRouter.delete("/apps", deleteUserApplication);

export default userRouter;
