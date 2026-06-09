const cake = document.getElementById('cake');
const iceCream = document.getElementById('ice-cream');
const tiramisu = document.getElementById('tiramisu');

const fillHeart = (item) => {
  item.classList.toggle("filled");
  item.innerHTML = item.classList.contains("filled") ? "&#10084;" : "&#9825;";
};

cake.addEventListener("click", () => fillHeart(cake));
iceCream.addEventListener("click", () => fillHeart(iceCream));
tiramisu.addEventListener("click", () => fillHeart(tiramisu));
