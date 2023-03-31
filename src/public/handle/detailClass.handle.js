const video = document.querySelector("#sourceMovie");

const getDetailFilm = async (img) => {
  document.querySelector(".wrapper-filter-detail-film").style.visibility =
    "visible";
  document.querySelector(".wrapper-filter-detail-film").style.opacity = 1;

  const movieId = img.getAttribute("data-id");
  const banner = img.getAttribute("data-banner");

  await fetch(`http://localhost:3000/movies/detail/${movieId}`)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((data) => {
      document.querySelector(".loadingClassFilter").style.display = "none";
      document.querySelector(".block-detail-film").style.display = "block";
      document
        .querySelector("#handleFavorite")
        .setAttribute("data-movie", data._id);
      document.querySelector("#sourceMovie").src = data.video.trailer;
      document.querySelector(".description-detail-film").innerHTML =
        data.description;
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

const addAndRemoveFavorite = async (a) => {
  const key = a.getAttribute("data-key");
  const userId = a.getAttribute("data-user");
  const movieId = a.getAttribute("data-movie");

  const handleFavorite = async (method, userId, movieId) => {
    await fetch(`http://localhost:3000/favorite/${userId}/${movieId}`, {
      method: method,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (!data.message) {
          alert("thành công");
        } else {
          alert(data.message);
        }
      });
  };

  if (key === "add") {
    await handleFavorite("GET", userId, movieId);
  }

  if (key === "remove") {
    await handleFavorite("DELETE", userId, movieId).then((data) =>
      location.reload()
    );
  }
};

const btnPlayVideo = document.querySelector("#btnPlayVideo");

btnPlayVideo.addEventListener("click", (e) => {
  if (video.requestFullscreen) {
    video.requestFullscreen();
  } else if (video.webkitRequestFullScreen) {
    video.webkitRequestFullScreen();
  } else if (video.mozRequestFullScreen) {
    video.mozRequestFullScreen();
  } else if (video.msRequestFullscreen) {
    video.msRequestFullscreen();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.code === "ArrowRight") {
    // Tua video tới phía trước 10 giây
    video.currentTime += 10;
  } else if (event.code === "ArrowLeft") {
    // Tua video tới phía sau 10 giây
    video.currentTime -= 10;
  }
});
