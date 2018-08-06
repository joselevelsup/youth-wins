import path from "path";
import userRouter from "./handlers/user.handler";
import resourceRouter from "./handlers/resource.handler";
import caseRouter from "./handlers/admin.handler";
import { login, signup } from "../auth/authenticate";


export default (app) => {

    app.post("/signup", signup);

    app.post("/login", login);

    app.use("/user", userRouter);

    app.use("/resources", resourceRouter);

    app.use("/cases", caseRouter);

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../../client/index.html"));
    });

}
