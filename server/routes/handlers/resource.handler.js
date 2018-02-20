import { Router } from "express";

import {
  getResources,
  getOneResource,
  createResource,
  updateResource,
  deleteResource
} from "../controllers/resource.controller";

const resourceRouter = Router();

resourceRouter
  .get("/", getResources)
  .get("/:resourceId", getOneResource)
  .post("/", createResource)
  .put("/:resourceId", updateResource)
  .delete("/:resourceId", deleteResource);

export default resourceRouter;
