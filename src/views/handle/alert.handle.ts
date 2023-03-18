export const mountAlert = () => {
  const alert = document.querySelector("#alert") as HTMLDivElement;
  if (alert.style.display === "block") {
    setTimeout(() => {
      alert.style.animation = "unMountAlert 0.75s forwards";
      setTimeout(() => {
        alert.style.display = "none";
      }, 1000);
    }, 3000);
  }
};
