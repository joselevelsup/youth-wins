import { Router } from "express";
import { checkUser, checkAdmin } from "../../helpers/access";
import {
    getUserResources,
    applyResource,
    userAppliedResources
} from "../controllers/resource.controller";

const resourceRouter = Router();

resourceRouter
    .get("/", getUserResources)
    .post("/apply", applyResource)

export default resourceRouter;
