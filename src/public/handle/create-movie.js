const mountAlert = () => {
  const alert = document.querySelector("#alert");
  if (alert.style.display === "block") {
    setTimeout(() => {
      alert.style.animation = "unMountAlert 0.75s forwards";
      setTimeout(() => {
        alert.style.display = "none";
      }, 1000);
    }, 3000);
  }
};

const formCreateMovie = document.querySelector("#my__form_film");

formCreateMovie.addEventListener("submit", async (e) => {
  e.preventDefault();
  const category = document.getElementsByName("category");
  const title = document.querySelector("#title");
  const cast = document.querySelector("#cast");
  const character = document.querySelector("#character");
  const genre = document.querySelector("#genre");
  const trailer = document.querySelector("#trailer");
  const description = document.querySelector("#description");
  const poster = document.querySelector("#poster_img");
  const banner = document.querySelector("#banner_img");

  const categoryValue = [];
  category.forEach((item) => item.checked && categoryValue.push(item.value));
  const titleValue = title.value;
  const castValue = cast.value;
  const characterValue = character.value;
  const genreValue = genre.value;
  const trailerValue = trailer.value;
  const descriptionValue = description.value;
  const posterValue = poster.files[0];
  const bannerValue = banner.files[0];

  if (posterValue == undefined || bannerValue == undefined) {
    return alert("file missing");
  }

  if (
    categoryValue.length < 1 ||
    titleValue == "" ||
    castValue == "" ||
    characterValue == "" ||
    genreValue == "" ||
    trailerValue == "" ||
    descriptionValue == ""
  ) {
    return alert("field missing");
  }

  const data = {
    title: titleValue,
    categories: categoryValue,
    casts: castValue.split(",").map((item) => item.trim()),
    characters: characterValue.split(",").map((item) => item.trim()),
    genres: genreValue.split(",").map((item) => item.trim()),
    trailer: trailerValue,
    description: descriptionValue,
  };

  console.log(data);

  // const formDate = new FormData();

  // formDate.append("data", JSON.stringify(data));

  // formDate.append("poster", posterValue);
  // formDate.append("banner", bannerValue);

  // const btnCreateMovie = document.querySelector("#btn-create-movie");
  // btnCreateMovie.innerHTML = `<img src="/images/btn-loading.svg" alt="btn-loading" class="w-max m-auto"/>`;

  // await fetch("http://localhost:3000/admin/movie/create", {
  //   method: "POST",
  //   mode: "cors",
  //   body: formDate,
  // })
  //   .then((res) => {
  //     if (res.ok) {
  //       console.log("Image uploaded successfully");
  //       btnCreateMovie.innerHTML = "Hoàn tất";
  //       const alert = document.querySelector("#alert");
  //       alert.style.display = "block";
  //       mountAlert();
  //       return res.json();
  //     }
  //   })
  //   .then((data) => console.log(data))
  //   .catch((error) => {
  //     console.error("Error uploading image:", error);
  //   });
});
