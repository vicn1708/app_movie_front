const mountAlert = () => {
  const alert = document.querySelector("#alert") as HTMLDivElement;
  if (alert.style.display === "block") {
    setTimeout(() => {
      alert.style.animation = "unMountAlert 0.75s forwards";
      setTimeout(() => {
        alert.style.display = "none";
        location.reload();
      }, 1000);
    }, 3000);
  }
};

type DataUpdateMovie = {
  title?: string;
  categories?: string[];
  casts?: string[];
  characters?: string[];
  genres?: string[];
  description?: string;
};

const formCreateMovie = document.querySelector(
  "#my__form_film"
) as HTMLFormElement;

formCreateMovie.addEventListener("submit", async (e: Event) => {
  e.preventDefault();
  const category = document.getElementsByName(
    "category"
  ) as NodeListOf<HTMLInputElement>;
  const movie = document.querySelector("#idMovie") as HTMLInputElement;
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
  const movieId: string = movie.value;
  const titleValue: string = title.value;
  const castValue: string = cast.value;
  const characterValue: string = character.value;
  const genreValue: string = genre.value;
  const descriptionValue: string = description.value;
  const trailerValue: File = trailer.files[0];
  const posterValue: File = poster.files[0];
  const bannerValue: File = banner.files[0];

  if (
    !titleValue &&
    !castValue &&
    !characterValue &&
    !genreValue &&
    !descriptionValue &&
    !trailerValue &&
    !posterValue &&
    !bannerValue
  )
    return alert("Không có dữ liệu để cập nhật");

  const data: DataUpdateMovie = {};

  if (titleValue && titleValue != "") data.title = titleValue;
  if (descriptionValue && descriptionValue != "")
    data.description = descriptionValue;
  if (categoryValue && categoryValue.length > 0)
    data.categories = categoryValue;
  if (castValue && castValue.split(",").map((item) => item.trim()).length > 0)
    data.casts = castValue.split(",").map((item) => item.trim());
  if (
    characterValue &&
    characterValue.split(",").map((item) => item.trim()).length > 0
  )
    data.characters = characterValue.split(",").map((item) => item.trim());
  if (genreValue && genreValue.split(",").map((item) => item.trim()).length > 0)
    data.genres = genreValue.split(",").map((item) => item.trim());

  const formData = new FormData();

  if (Object.keys(data).length > 0)
    formData.append("data", JSON.stringify(data));

  trailerValue && formData.append("trailer", trailerValue);
  posterValue && formData.append("poster", posterValue);
  bannerValue && formData.append("banner", bannerValue);

  const btnCreateMovie = document.querySelector(
    "#btn-create-movie"
  ) as HTMLButtonElement;
  btnCreateMovie.innerHTML = `<img src="/images/btn-loading.svg" alt="btn-loading" class="w-max m-auto"/>`;

  await fetch(`http://localhost:3000/movies/${movieId}`, {
    method: "PUT",
    mode: "cors",
    body: formData,
  })
    .then((res: Response) => res.json())
    .then((data) => {
      console.log(data);
      if (data.message) {
        btnCreateMovie.innerHTML = "Hoàn tất";
        console.log("not handle");
      } else {
        console.log("Image uploaded successfully");
        btnCreateMovie.innerHTML = "Hoàn tất";
        const alert = document.querySelector("#alert") as HTMLDivElement;
        alert.style.display = "block";
        mountAlert();
      }
    })
    .catch((error) => {
      console.error("Error uploading image:", error);
    });
});
