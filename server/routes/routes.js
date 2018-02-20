import userRouter from "./handlers/user.handler";
import resourceRouter from "./handlers/resource.handler";
import caseRouter from "./handlers/admin.handler";

export default (app) => {
  app.use("/user", userRouter);

  app.use("/resources", resourceRouter);

  app.use("/cases", caseRouter);
}
