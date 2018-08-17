import { Router } from "express";
import { checkUser, checkAdmin } from "../../helpers/access";
import {
    getUserResources,
  getOneResource,
  createResource,
  updateResource,
  deleteResource
} from "../controllers/resource.controller";

const resourceRouter = Router();

resourceRouter
    .get("/", getUserResources)
    .get("/:resourceId", getOneResource)
    .post("/", checkAdmin, createResource)
    .put("/:resourceId", checkAdmin, updateResource)
    .delete("/:resourceId", checkAdmin, deleteResource);

export default resourceRouter;
