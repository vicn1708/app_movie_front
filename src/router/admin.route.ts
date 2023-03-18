import { AdminController } from "../controllers/admin.controller";
import express from "express";

export default (router: express.Router) => {
  router.get("/admin/:page", AdminController.browserPage);

  router.get("/admin/movie/detail/:id", AdminController.detail);
};
