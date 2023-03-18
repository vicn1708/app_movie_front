import { BrowserController } from "../controllers/browser.controller";
import express from "express";

export default (router: express.Router) => {
  router.get("/", BrowserController.indexPage);
  router.get("/browser", BrowserController.browserPage);
  router.get("/favorite", BrowserController.favoritePage);
};
