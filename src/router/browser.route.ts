import {
  checkAuth,
  checkIsMainUserIndex,
  checkMainUser,
} from "../middleware/authentication";
import { BrowserController } from "../controllers/browser.controller";
import express from "express";

export default (router: express.Router) => {
  router.get("/", checkAuth, checkIsMainUserIndex, BrowserController.indexPage);

  router.get(
    "/browser",
    checkAuth,
    checkMainUser,
    BrowserController.browserPage
  );

  router.get(
    "/favorite",
    checkAuth,
    checkMainUser,
    BrowserController.favoritePage
  );

  router.get("/profile", BrowserController.profilePage);
};
