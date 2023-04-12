type Account = {
  email: string;
  password: string;
  username?: string;
};

const fetchPostOption = (data: Account) => {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // mode: "cors",
    // keepalive: true,
    body: JSON.stringify(data),
  };
};

//* Toggle login
let toggleForm = "login";

document.querySelector("#username").parentElement.style.display = "none";

const toggleLogin = document.querySelector("#toggleLogin");

toggleLogin.addEventListener("click", () => {
  toggleForm === "login" ? (toggleForm = "register") : (toggleForm = "login");

  const titleLogin = document.querySelector("#titleLogin");
  const inputUsername = document.querySelector("#username");
  const btnLogin = document.querySelector("#btnLogin");
  const textToggleLogin = document.querySelector("#textToggleLogin");

  if (toggleForm == "register") {
    document.title = "Đăng ký";
    inputUsername.parentElement.style.display = "block";
    titleLogin.innerHTML = "Đăng ký";
    btnLogin.innerHTML = "Đăng ký";
    textToggleLogin.innerHTML = "Bạn đã có tài khoản?";
    toggleLogin.innerHTML = "Đăng nhập";
  } else {
    document.title = "Đăng nhập";
    inputUsername.parentElement.style.display = "none";
    titleLogin.innerHTML = "Đăng nhập";
    btnLogin.innerHTML = "Đăng nhập";
    textToggleLogin.innerHTML = "Lần đầu bạn vào Neflix?";
    toggleLogin.innerHTML = "Tạo tài khoản mới";
  }
});

//* Submit form
const btnLogin = document.querySelector("#btnLogin") as HTMLElement;
btnLogin.addEventListener("click", async () => {
  const username = document.querySelector("#username") as HTMLInputElement;
  const email = document.querySelector("#email") as HTMLInputElement;
  const password = document.querySelector("#password") as HTMLInputElement;

  if (toggleForm === "register") {
    if (!username.value || !email.value || !password.value) {
      return alert("not value");
    }

    const data: Account = {
      email: email.value,
      username: username.value,
      password: password.value,
    };

    const fetchRegisterOption: any = {
      ...fetchPostOption(data),
    };

    const account = await fetch(
      `http://localhost:3000/auth/register`,
      fetchRegisterOption
    )
      .then((response) => response.json())
      .then((data) => {
        const accessToken = data.access_token;
        const refreshToken = data.refresh_token;

        if (!accessToken && !refreshToken) {
          return console.log(data);
        }

        const setTime10p = new Date(
          new Date().getTime() + 60 * 10
        ).toUTCString();
        const setTime30d = new Date(
          new Date().getTime() + 60 * 60 * 24 * 30 * 1000
        ).toUTCString();

        document.cookie = `accessToken=${accessToken}; expires=${setTime10p}`;
        document.cookie = `refreshToken=${refreshToken}; expires=${setTime30d}`;

        location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  } else {
    if (!email.value || !password.value) {
      return alert("missing data field");
    }

    const data: Account = {
      email: email.value,
      password: password.value,
    };

    const fetchLoginOption: any = {
      ...fetchPostOption(data),
    };

    const user = await fetch(
      `http://localhost:3000/auth/login`,
      fetchLoginOption
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.status) {
          return console.log(data);
        }

        console.log(data);

        const accessToken = data.access_token;
        const refreshToken = data.refresh_token;

        const setTime1h = new Date(
          new Date().getTime() + 60 * 60 * 1000
        ).toUTCString();
        const setTime30d = new Date(
          new Date().getTime() + 60 * 60 * 24 * 30 * 1000
        ).toUTCString();

        document.cookie = `accessToken=${accessToken}; expires=${setTime1h}`;
        document.cookie = `refreshToken=${refreshToken}; expires=${setTime30d}`;

        location.href = "/";
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
});
