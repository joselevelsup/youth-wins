import { Router } from "express";
import { checkAdmin } from "../../helpers/access";
import {
    getAllCases,
    getUsers,
    getResources,
    createResource,
    updateResource,
    deleteResource,
    createStaff,
    updateStaff,
    deleteStaff,
    updateUser,
    deleteUser
} from "../controllers/admin.controller";

const adminRouter = Router();

//adminRouter
    // .get("/", checkAdmin, getAllCases)
    // .get("/:caseId", checkAdmin, getCaseById)
adminRouter.get("/resources", getResources);
adminRouter.post("/resources", createResource);
adminRouter.put("/resources", updateResource);
adminRouter.delete("/resources", deleteResource);

adminRouter.get("/users", getUsers);
adminRouter.post("/users/s", createStaff);
adminRouter.put("/users/s", updateStaff);
adminRouter.delete("/user/s", deleteStaff);
// adminRouter.put("/users", updateUser);
adminRouter.delete("/users", deleteUser);



export default adminRouter;
