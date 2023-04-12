const formCreateCategory = document.querySelector<HTMLFormElement>(
  ".form-create-category"
);

const mountAlert = (id?: string) => {
  const alert = document.querySelector("#alert") as HTMLDivElement;
  if (alert.style.display === "block") {
    setTimeout(() => {
      alert.style.animation = "unMountAlert 0.75s forwards";
      setTimeout(() => {
        alert.style.display = "none";
        //   location.href = `/admin/movie/detail/${id}`;
      }, 1000);
    }, 3000);
  }
};

type DataCreateCategory = {
  name: string;
  status?: string;
};

formCreateCategory.addEventListener("submit", async (e) => {
  e.preventDefault();

  const btnCreateCategory = document.querySelector(
    "#btn-create-category"
  ) as HTMLButtonElement;
  btnCreateCategory.innerHTML = `<img src="/images/btn-loading.svg" alt="btn-loading" class="w-max m-auto"/>`;

  const form: any = e.target;

  const statusCategory = form.status.value;
  const nameCategory = form.name.value;

  const data: DataCreateCategory = {
    name: nameCategory,
    status: statusCategory,
  };

  await fetch(`http://localhost:3000/categories`, {
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.message) {
        btnCreateCategory.innerHTML = "Hoàn tất";
        console.log("not handle");
        alert("not handle");
      } else {
        btnCreateCategory.innerHTML = "Hoàn tất";
        location.href = "./categories";
      }
    });
});
