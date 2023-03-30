const mountAlert = (id: string) => {
  const alert = document.querySelector("#alert") as HTMLDivElement;
  if (alert.style.display === "block") {
    setTimeout(() => {
      alert.style.animation = "unMountAlert 0.75s forwards";
      setTimeout(() => {
        alert.style.display = "none";
        location.href = `/admin/movie/detail/${id}`;
      }, 1000);
    }, 3000);
  }
};

type DataCreateMovie = {
  title: string;
  categories: string[];
  casts: string[];
  characters: string[];
  genres: string[];
  description: string;
};

const formCreateMovie = document.querySelector(
  "#my__form_film"
) as HTMLFormElement;

formCreateMovie.addEventListener("submit", async (e: Event) => {
  e.preventDefault();
  const category = document.getElementsByName(
    "category"
  ) as NodeListOf<HTMLInputElement>;
  const title = document.querySelector("#title") as HTMLInputElement;
  const cast = document.querySelector("#cast") as HTMLInputElement;
  const character = document.querySelector("#character") as HTMLInputElement;
  const genre = document.querySelector("#genre") as HTMLInputElement;
  const description = document.querySelector(
    "#description"
  ) as HTMLInputElement;
  const trailer = document.querySelector("#trailer") as HTMLInputElement;
  const poster = document.querySelector("#poster_img") as HTMLInputElement;
  const banner = document.querySelector("#banner_img") as HTMLInputElement;

  const categoryValue: string[] = [];
  category.forEach((item) => item.checked && categoryValue.push(item.value));
  const titleValue: string = title.value;
  const castValue: string = cast.value;
  const characterValue: string = character.value;
  const genreValue: string = genre.value;
  const descriptionValue: string = description.value;
  const trailerValue: File = trailer.files[0];
  const posterValue: File = poster.files[0];
  const bannerValue: File = banner.files[0];

  if (
    posterValue == undefined ||
    bannerValue == undefined ||
    trailerValue == undefined
  ) {
    return alert("file missing");
  }

  if (
    categoryValue.length < 1 ||
    titleValue == "" ||
    castValue == "" ||
    characterValue == "" ||
    genreValue == "" ||
    descriptionValue == ""
  ) {
    return alert("field missing");
  }

  const data: DataCreateMovie = {
    title: titleValue,
    categories: categoryValue,
    casts: castValue.split(",").map((item) => item.trim()),
    characters: characterValue.split(",").map((item) => item.trim()),
    genres: genreValue.split(",").map((item) => item.trim()),
    description: descriptionValue,
  };

  const formDate = new FormData();

  formDate.append("data", JSON.stringify(data));

  formDate.append("trailer", trailerValue);
  formDate.append("poster", posterValue);
  formDate.append("banner", bannerValue);

  const btnCreateMovie = document.querySelector(
    "#btn-create-movie"
  ) as HTMLButtonElement;
  btnCreateMovie.innerHTML = `<img src="/images/btn-loading.svg" alt="btn-loading" class="w-max m-auto"/>`;

  await fetch("http://localhost:3000/movies/create", {
    method: "POST",
    mode: "cors",
    body: formDate,
  })
    .then((res: Response) => {
      if (res.ok) {
        console.log("Image uploaded successfully");
        btnCreateMovie.innerHTML = "Hoàn tất";
        const alert = document.querySelector("#alert") as HTMLDivElement;
        alert.style.display = "block";
        return res.json();
      } else {
        btnCreateMovie.innerHTML = "Hoàn tất";
        console.log("not handle");
        return res.json();
      }
    })
    .then((data) => {
      mountAlert(data.movie._id);
    })
    .catch((error) => {
      console.error("Error uploading image:", error);
    });
});
