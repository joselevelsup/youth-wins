import { Router } from "express";

import {
    getAllCases,
    createCase
} from "../controllers/case.controller";

const caseRouter = Router();

caseRouter
    .get("/", getAllCases)
    .post("/", createCase);

export default caseRouter;
