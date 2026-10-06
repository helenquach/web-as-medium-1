document.addEventListener("DOMContentLoaded", () => {
  // Your code here
  const letters = document.querySelectorAll(".letter");
  const toggle = document.querySelector(".toggle");
  const reset = document.querySelector(".reset");

  toggle.addEventListener("click", () => {
    if (!letters[0].classList.contains("active")) {
      letters.forEach((letter) => {
        letter.classList.toggle("active");
      });
      reset.classList.toggle("active");
    }
  });

  letters.forEach((letter) => {
    letter.addEventListener("click", () => {
      if (letter.classList.contains("active")) {
        letter.classList.toggle("effect");
      }
    });
  });

  reset.addEventListener("click", () => {
    letters.forEach((letter) => {
      letter.classList.remove("active");
      letter.classList.remove("effect");
    });
    reset.classList.toggle("active");
  });
});