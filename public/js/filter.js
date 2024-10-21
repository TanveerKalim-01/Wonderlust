const container = document.querySelector(".filter-container");
const scrollAmount = 100; // Amount to scroll

document.querySelector(".left-btn").addEventListener("click", () => {
  container.scrollLeft -= scrollAmount; // Scroll left
  console.log("left click");
});

document.querySelector(".right-btn").addEventListener("click", () => {
  container.scrollLeft += scrollAmount; // Scroll right
  console.log("right click");
});
