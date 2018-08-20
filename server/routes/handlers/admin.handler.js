import { Router } from "express";
import { checkAdmin } from "../../helpers/access";
import {
    getAllCases,
    getCaseById,
    getResources,
    getUsers
} from "../controllers/admin.controller";

const adminRouter = Router();

adminRouter
    // .get("/", checkAdmin, getAllCases)
    // .get("/:caseId", checkAdmin, getCaseById)
    .get("/resources", getResources)
    .get("/users", getUsers);

export default adminRouter;
