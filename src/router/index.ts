import express from "express";
import authRoute from "./auth.route";
import browserRoute from "./browser.route";
import adminRoute from "./admin.route";

const router = express.Router();

export default (): express.Router => {
  authRoute(router);
  adminRoute(router);
  browserRoute(router);
  return router;
};
