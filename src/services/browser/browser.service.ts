import { Request, Response } from "express";
import fetch from "node-fetch";

export const BrowserService = {
  async indexPage(req: Request, res: Response) {
    const token = req.cookies.accessToken;

    const users = await fetch(
      `${process.env.DOMAIN_API}/user/all-user-account`,
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

    const users: any[] = await fetch(
      `${process.env.DOMAIN_API}/user/all-user-account`,
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

    const mainUser = users.find((user: any) => req.user.data._id == user._id);

    const resultUser = {
      ...mainUser,
      userElse: [],
    };

    console.log(users);

    return res.render("public/browser", {
      users,
      moviesByCategory,
      movieBanner: moviesByCategory[0].movies[randomMovie],
    });
  },

  async favoritePage(req: any, res: Response) {
    const userId = req.user.data._id;

    const movies = await fetch(`${process.env.DOMAIN_API}/favorite/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        return data.map((movie: any) => ({
          _id: movie._id,
          poster: movie.poster[0].uri,
        }));
      });

    return res.render("public/list-favorite", { movies });
  },
};
