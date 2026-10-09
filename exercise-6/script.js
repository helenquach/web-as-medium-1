document.addEventListener("DOMContentLoaded", () => {
  // Your code here
  const letterWrappers = document.querySelectorAll(".letter-wrapper");
  const toggle = document.querySelector(".toggle");
  const reset = document.querySelector(".reset");
  const effectEs = document.querySelectorAll(".effect-e");

  toggle.addEventListener("click", () => {
    if (!letterWrappers[0].classList.contains("active")) {
      letterWrappers.forEach((letterWrapper) => {
        letterWrapper.style.setProperty("transition", "transform 0.8s ease-in-out, font-size 0.8s ease-in-out");
        letterWrapper.classList.toggle("active");
      });
      reset.classList.toggle("active");
    }
  });

  letterWrappers.forEach((letterWrapper) => {
    letterWrapper.addEventListener("click", () => {
      if (letterWrapper.classList.contains("active")) {
        const letter = letterWrapper.querySelector(".letter");
        letter.classList.toggle("effect");
        
        if (letter.id === "letter-e") {
          effectEs.forEach((effectE) => {
            effectE.style.setProperty("transition", "transform 0.8s ease");
          });
        }
      }
    });
    letterWrapper.addEventListener("transitionend", () => {
      letterWrapper.style.setProperty("transition", "none");
    });
  });

  reset.addEventListener("click", () => {
    letterWrappers.forEach((letterWrapper) => {
      letterWrapper.style.setProperty("transition", "transform 0.8s ease-in-out, font-size 0.8s ease-in-out");

      const letter = letterWrapper.querySelector(".letter");
      letter.classList.remove("effect");
      letterWrapper.classList.toggle("active");
    });
    reset.classList.toggle("active");
  });

  effectEs.forEach((effectE) => {
    effectE.addEventListener("transitionend", () => {
      effectE.style.setProperty("transition", "none");
    });
  });
});