import { Request, Response } from "express";
import fetch from "node-fetch";

export const BrowserService = {
  async indexPage(req: Request, res: Response) {
    const token = req.cookies.accessToken;

    const users = await fetch(
      `${process.env.DOMAIN_API}/auth/all-users-account`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => data);

    return res.render("public/index", { users });
  },

  async browserPage(req: any, res: Response) {
    const token = req.cookies.accessToken;
    const main = req.main;

    const moviesByCategory: any[] = await fetch(
      `${process.env.DOMAIN_API}/movies/movies-by-category`
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data: any[]) => {
        return data.map((item) => {
          return {
            category: item.category,
            movies: item.movies.map((movie: any) => ({
              _id: movie._id,
              title: movie.title,
              poster: movie.poster[0].uri,
              banner: movie.banner[0].uri,
            })),
          };
        });
      });

    const randomMovie = Math.floor(
      Math.random() * moviesByCategory[0].movies.length
    );

    const icon = {
      userId: main,
      key: "add",
      name: "fa-solid fa-plus",
      tooltip: "Thêm vào danh sách của bạn",
    };

    return res.render("public/browser", {
      main,
      moviesByCategory,
      movieBanner: moviesByCategory[0].movies[randomMovie],
      icon,
    });
  },

  async favoritePage(req: any, res: Response) {
    const main = req.main;

    let movies = await fetch(`${process.env.DOMAIN_API}/favorite/${main._id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.message) return [];

        return data.map((movie: any) => ({
          _id: movie._id,
          poster: movie.poster[0].uri,
        }));
      });

    const icon = {
      userId: main,
      key: "remove",
      name: "fa-solid fa-trash",
      tooltip: "Xóa khỏi danh sách của bạn",
    };

    return res.render("public/list-favorite", { main, movies, icon });
  },
};
