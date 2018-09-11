import { Router } from "express";
import { checkUser, checkAdmin } from "../../helpers/access";
import {
    getUserResources,
    applyResource,
    userAppliedResources,
    createResource
} from "../controllers/resource.controller";

const resourceRouter = Router();

resourceRouter
    .get("/", getUserResources)
    .post("/create-resource",  createResource)
    .post("/apply", applyResource)

export default resourceRouter;
