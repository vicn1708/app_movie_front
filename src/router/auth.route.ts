import { AuthController } from "../controllers/auth.controller";
import express from "express";

export default (router: express.Router) => {
  router.get("/login", AuthController.loginPage);
  router.post("/handle-login", AuthController.loginHandle);
};
