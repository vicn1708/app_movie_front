const getDetailFilm = async (img) => {
  document.querySelector(".wrapper-filter-detail-film").style.visibility =
    "visible";
  document.querySelector(".wrapper-filter-detail-film").style.opacity = 1;

  const movieId = img.getAttribute("data-id");

  await fetch(`http://localhost:3000/movies/detail/${movieId}`)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((data) => {
      document.querySelector(".loadingClassFilter").style.display = "none";
      document.querySelector(".block-detail-film").style.display = "block";
      document.querySelector("#sourceMovie").src = data.video.trailer;
      document.querySelector(".description-detail-film").innerHTML =
        data.description;

      // if (document.getElementById("removeFavorite")) {
      //   document.querySelector(
      //     ".list-btn-detail-film"
      //   ).children[1].href = `/removeYourFavorite/${f_id}`;
      // } else {
      //   document.querySelector(
      //     ".list-btn-detail-film"
      //   ).children[1].href = `/addYourFavorite/${f_id}`;
      // }
    });
};

document.querySelector(".filter-detail-film").addEventListener("click", () => {
  document.querySelector(".wrapper-filter-detail-film").style.visibility =
    "hidden";
  document.querySelector(".wrapper-filter-detail-film").style.opacity = 0;
  document.querySelector("#sourceMovie").src = "";
  document.querySelector(".description-detail-film").innerHTML = "";
  document.querySelector(".block-detail-film").style.display = "none";
  document.querySelector(".loadingClassFilter").style.display = "grid";
});
