//* Handle slide
const slideListFilm = (width: number) => {
  const prev: NodeListOf<Element> = document.querySelectorAll(
    ".list-slide-film-prev"
  );
  const next: NodeListOf<Element> = document.querySelectorAll(
    ".list-slide-film-next"
  );
  prev.forEach((item: HTMLElement) => {
    item.onclick = () => {
      const itemSlide = item.parentElement.children[1].children[0]
        .children[0] as HTMLDivElement;
      const widthItem: number = itemSlide.offsetWidth;
      item.parentElement.children[1].scrollLeft -= widthItem * width;
    };
  });
  next.forEach((item: HTMLElement) => {
    item.onclick = () => {
      const itemSlide = item.parentElement.children[1].children[0]
        .children[0] as HTMLDivElement;
      const widthItem: number = itemSlide.offsetWidth;
      item.parentElement.children[1].scrollLeft += widthItem * width;
    };
  });
};

if (window.screen.width <= 768) {
  slideListFilm(2);
} else {
  slideListFilm(5);
}
