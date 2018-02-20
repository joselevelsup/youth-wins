import { Router } from "express";
import {
  getAllCases,
  getCaseById
} from "../controllers/admin.controller";

const caseRouter = Router();

caseRouter
  .get("/", getAllCases)
  .get("/:caseId", getCaseById);

export default caseRouter;
