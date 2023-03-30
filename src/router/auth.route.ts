import { checkUser } from "../middleware/authentication";
import { AuthController } from "../controllers/auth.controller";
import express from "express";

export default (router: express.Router) => {
  router.get("/login", checkUser, AuthController.loginPage);
  router.get("/log-out", AuthController.logOut);
};
