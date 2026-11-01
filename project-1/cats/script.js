document.addEventListener("DOMContentLoaded", () => {
  const cursor = document.querySelector('.cursor');
  let initCursor = false;

  window.addEventListener('mousemove', (e) => {
    if (!initCursor) {
      cursor.style.opacity = '1';
      initCursor = true;
    }

    cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  });

  document.querySelectorAll('a, .thumbnail-image').forEach((link) => {
    link.addEventListener('mouseover', () => {
      cursor.classList.add('hover');
    });
    link.addEventListener('mouseout', () => {
      cursor.classList.remove('hover');
    });
  });

  window.addEventListener('mouseout', (e) => {
    if(e.clientY <= 0 || e.clientX <= 0 || (e.clientX >= window.innerWidth || e.clientY >= window.innerHeight)) {
      cursor.style.opacity = '0';
      initCursor = false;
    }
  });

  const thumbnailImages = document.querySelectorAll(".thumbnail-image");
  const currentImage = document.querySelector(".current-image img");
  thumbnailImages.forEach((thumb) => {
    const image = thumb.querySelector("img");
    thumb.addEventListener("click", () => {
      currentImage.src = image.src;
    })
  })
});