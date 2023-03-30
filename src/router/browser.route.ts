import { checkAuth } from "../middleware/authentication";
import { BrowserController } from "../controllers/browser.controller";
import express from "express";

export default (router: express.Router) => {
  router.get("/", checkAuth, BrowserController.indexPage);
  router.get("/browser", checkAuth, BrowserController.browserPage);
  router.get("/favorite", checkAuth, BrowserController.favoritePage);
};
