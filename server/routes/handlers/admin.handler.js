import { Router } from "express";
import { checkAdmin } from "../../helpers/access";
import {
    getAllCases,
    getUsers,
    getResources,
    createResource,
    updateResource,
    deleteResource,
    approveResource,
    denyResource,
    createStaff,
    updateStaff,
    deleteStaff,
    updateUser,
    deleteUser,
    getAllApplications,
    deleteApplication
} from "../controllers/admin.controller";
 
const adminRouter = Router();

adminRouter.get("/resources", getResources);
adminRouter.post("/resources", createResource);
adminRouter.put("/resources", updateResource);
adminRouter.delete("/resources", deleteResource);

adminRouter.post("/resource/approve", approveResource);
adminRouter.post("/resource/deny", denyResource);

adminRouter.get("/users", getUsers);
adminRouter.delete("/users/a", deleteUser);

adminRouter.post("/users/s", createStaff);
adminRouter.put("/users/s", updateStaff);
adminRouter.delete("/users/s", deleteStaff);
// adminRouter.put("/users", updateUser);

adminRouter.get("/apps", getAllApplications);
adminRouter.delete("/apps", deleteApplication);

export default adminRouter;
