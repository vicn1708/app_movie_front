import { Request, Response } from "express";
import fetch from "node-fetch";

export const AdminService = {
  async browserPage(req: Request, res: Response) {
    let page: string;
    switch (req.params.page) {
      case "dashboard":
        page = "../private/dashboard";
        break;

      case "movies":
        page = "../private/movies";

        const movies = await fetch(`${process.env.DOMAIN_API}/movies`)
          .then((res) => {
            if (res.ok) {
              return res.json();
            }
          })
          .then((data) => data)
          .catch((err) => console.log(err));

        return res.render("private/index", { page, movies });

      case "create-movie":
        page = "../private/create-movie";

        const categories = await fetch(`${process.env.DOMAIN_API}/categories`)
          .then((res) => {
            if (res.ok) {
              return res.json();
            }
          })
          .then((data) => data)
          .catch((err) => console.log(err));

        return res.render("private/index", { page, categories });

      default:
        page = null;
        break;
    }

    return res.render("private/index", { page });
  },

  async detailMoviePage(req: Request, res: Response) {
    const movieId = req.params.id;

    const movie = await fetch(`${process.env.DOMAIN_API}/movie/${movieId}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => data)
      .catch((err) => console.log(err));

    return res.render("private/detail-movie", { movie });
  },
};
