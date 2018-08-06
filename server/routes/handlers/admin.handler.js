import { Router } from "express";
import { checkAdmin } from "../../helpers/access";
import {
  getAllCases,
  getCaseById
} from "../controllers/admin.controller";

const caseRouter = Router();

caseRouter
    .get("/", checkAdmin, getAllCases)
    .get("/:caseId", checkAdmin, getCaseById);

export default caseRouter;
