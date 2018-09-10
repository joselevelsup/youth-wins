import { Router } from "express";
import { checkUser, checkAdmin } from "../../helpers/access";
import {
    getUserResources,
    getOneResource,
    applyResource,
  createResource,
  updateResource,
  deleteResource
} from "../controllers/resource.controller";

const resourceRouter = Router();

resourceRouter
    .get("/", getUserResources)
    .get("/:resourceId", getOneResource)
    .post("/", applyResource)
    .post("/create-resource",  createResource)
    .put("/:resourceId", checkAdmin, updateResource)
    .delete("/:resourceId", checkAdmin, deleteResource);

export default resourceRouter;
