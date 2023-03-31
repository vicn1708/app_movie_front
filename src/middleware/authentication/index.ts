import { Request, Response, NextFunction } from "express";
import fetch from "node-fetch";

//* Gọi api để kiểm tra user có tồn tại hay không
const getUser = async (token: string) => {
  const user = await fetch(`${process.env.DOMAIN_API}/auth/profile`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((data) => data);

  return user;
};

//* Nhận access token mới qua refresh token
const getAccessToken = async (refreshToken: string): Promise<string> => {
  const refresh_token = {
    refresh_token: refreshToken,
  };

  const newToken = await fetch(`${process.env.DOMAIN_API}/auth/refresh-token`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(refresh_token),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((data) => data.access_token);

  return newToken;
};

//* Check đăng nhập thành công thì chuyển qua trang home và xử lý token khi bị lỗi hoặc hết hạn
export const checkAuth = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  let token = req.cookies.accessToken;
  const refresh_token = req.cookies.refreshToken;

  if (!token && !refresh_token) {
    return res.redirect("/login");
  }

  if (!(await getUser(refresh_token))) {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.clearCookie("main");

    return res.redirect("/login");
  }

  if (refresh_token && !token) {
    token = await getAccessToken(refresh_token);

    res.cookie("accessToken", token, {
      expires: new Date(new Date().getTime() + 60 * 60 * 24 * 30 * 1000),
    });

    return res.redirect("/");
  }

  let user = await getUser(token);

  if (!user) {
    token = await getAccessToken(refresh_token);

    res.cookie("accessToken", token, {
      expires: new Date(new Date().getTime() + 60 * 60 * 24 * 30 * 1000),
    });

    user = await getUser(token);

    return res.redirect("/");
  }

  if (user.exp <= Date.now() / 1000 + 60 * 5) {
    token = await getAccessToken(refresh_token);

    res.cookie("accessToken", token, {
      expires: new Date(new Date().getTime() + 60 * 60 * 24 * 30 * 1000),
    });

    user = await getUser(token);
  }

  req.user = user;

  return next();
};

//* Check nếu đã đăng nhập thành công thì ko cho vào trang đăng nhập nữa
export const checkUser = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.accessToken;
  const refresh_token = req.cookies.refreshToken;

  if (refresh_token) {
    const user = await getUser(refresh_token);

    if (user) return res.redirect("/");
  }

  if (!token && !refresh_token) {
    return next();
  }

  const user = getUser(token);

  if (!user) {
    return next();
  }

  return res.redirect("/");
};

//* Check xem đã chọn người dùng chính chưa, nếu chưa thì quay lại trang chọn người dùng
export const checkMainUser = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.accessToken;
  const mainId = req.cookies.main;

  if (!mainId) return res.redirect("/");

  const main: any = await fetch(
    `${process.env.DOMAIN_API}/auth/main-users-account/${mainId}`,
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
    .then((data) => {
      if (data.message) {
        res.clearCookie("main");
        return res.redirect("/");
      }

      return data;
    });

  req.main = main;

  return next();
};

export const checkIsMainUserIndex = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.accessToken;
  const mainId = req.cookies.main;

  if (!mainId) return next();

  await fetch(`${process.env.DOMAIN_API}/auth/main-users-account/${mainId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((data) => {
      if (data.message) {
        res.clearCookie("main");
        return next();
      }

      return res.redirect("/browser");
    });
};
