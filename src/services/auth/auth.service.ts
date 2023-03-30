import { Request, Response } from "express";
import fetch from "node-fetch";
import { InputProps } from "../../types/inputProps.type";

export const AuthService = {
  loginPage(req: Request, res: Response) {
    const email: InputProps = {
      id: "email",
      title: "Email",
    };
    const username: InputProps = {
      id: "username",
      title: "Username",
    };
    const password: InputProps = {
      id: "password",
      title: "Password",
      type: "password",
    };

    const props = {
      email,
      username,
      password,
    };

    return res.render("public/auth", { props });
  },

  logOut(req: Request, res: Response) {
    res.clearCookie("refreshToken");

    return res.redirect("/login");
  },
};
