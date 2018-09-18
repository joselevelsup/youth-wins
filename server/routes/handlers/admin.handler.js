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
    deleteApplication,
    updateSelf
} from "../controllers/admin.controller";


import {
    getAllContent,
    updateHomeContent,
    updateSupportContent,
    updateAboutContent,
    addMember,
    createCategory,
    deleteCategory
} from "../controllers/cms.controller";
const adminRouter = Router();

adminRouter.get("/cms", getAllContent);
adminRouter.get("/cms/e", getAllContent);
adminRouter.put("/cms/home", updateHomeContent);
adminRouter.put("/cms/support", updateSupportContent);
adminRouter.put("/cms/about", updateAboutContent);

adminRouter.post("/cms/add-member", addMember);

adminRouter.post("/cms/category", createCategory);
adminRouter.delete("/cms/category", deleteCategory);

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

adminRouter.put("/profile", updateSelf);

export default adminRouter;
