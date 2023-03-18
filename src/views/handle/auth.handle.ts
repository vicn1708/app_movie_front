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
    mode: "cors",
    keepalive: true,
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
    document.title = "Sign up";
    inputUsername.parentElement.style.display = "block";
    titleLogin.innerHTML = "Sign up";
    btnLogin.innerHTML = "Register";
    textToggleLogin.innerHTML = "Already have an account?";
    toggleLogin.innerHTML = "Login";
  } else {
    document.title = "Sign in";
    inputUsername.parentElement.style.display = "none";
    titleLogin.innerHTML = "Sign in";
    btnLogin.innerHTML = "Login";
    textToggleLogin.innerHTML = "Fisrt time using Neflix";
    toggleLogin.innerHTML = "Create an account";
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
      `${process.env.DOMAIN_API}/auth/register`,
      fetchRegisterOption
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
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
      `${process.env.DOMAIN_API}/auth/login`,
      fetchLoginOption
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
});
