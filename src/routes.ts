import { BlogRoutes } from "./modules/v1/blog/blog.routes";
import { UserRoutes } from "./modules/v1/user/user.routes";
import express from "express";

export class Routes {
  router = express.Router();

  path() {
    this.router.use('/user', new UserRoutes().router);
    this.router.use('/blog', new BlogRoutes().router);
    return this.router;
  }
}
