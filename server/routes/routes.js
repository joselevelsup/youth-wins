import path from "path";
import userRouter from "./handlers/user.handler";
import resourceRouter from "./handlers/resource.handler";
import adminRouter from "./handlers/admin.handler";
import { login, signup, logOut } from "../auth/authenticate";


export default (app) => {

    app.post("/signup", signup);

    app.post("/login", login);

    app.get("/logout", logOut);

    app.use("/user", userRouter);

    app.use("/resources", resourceRouter);

    app.use("/admin", adminRouter);

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../../client/index.html"));
    });

}
