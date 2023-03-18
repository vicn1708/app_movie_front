//* Handle slide
var slideListFilm = function (width) {
  var prev = document.querySelectorAll(".list-slide-film-prev");
  var next = document.querySelectorAll(".list-slide-film-next");
  prev.forEach(function (item) {
    item.onclick = function () {
      var itemSlide = item.parentElement.children[1].children[0].children[0];
      var widthItem = itemSlide.offsetWidth;
      item.parentElement.children[1].scrollLeft -= widthItem * width;
    };
  });
  next.forEach(function (item) {
    item.onclick = function () {
      var itemSlide = item.parentElement.children[1].children[0].children[0];
      var widthItem = itemSlide.offsetWidth;
      item.parentElement.children[1].scrollLeft += widthItem * width;
    };
  });
};
if (window.screen.width <= 768) {
  slideListFilm(2);
} else {
  slideListFilm(5);
}
