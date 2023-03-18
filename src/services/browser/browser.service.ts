import { Request, Response } from "express";

export const BrowserService = {
  indexPage(req: Request, res: Response) {
    return res.render("public/index");
  },

  browserPage(req: Request, res: Response) {
    return res.render("public/browser");
  },

  favoritePage(req: Request, res: Response) {
    return res.render("public/list-favorite");
  },
};
