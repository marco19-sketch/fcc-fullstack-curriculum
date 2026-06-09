const lightbox = document.querySelector(".lightbox");
const galleryItem = document.querySelectorAll(".gallery-item");
const lightboxImage = document.getElementById("lightbox-image");
const close = document.getElementById("close");

galleryItem.forEach((item) => {
  item.addEventListener("click", () => {
    const updatedUrl = item.src.split("-thumbnail").join("");
    lightboxImage.setAttribute("src", updatedUrl);
    lightbox.style.display = "flex";
    lightbox.appendChild(lightboxImage);
  });
});

lightbox.addEventListener("click", () => (lightbox.style.display = "none"));

close.addEventListener("click", () => (lightbox.style.display = "none"));
