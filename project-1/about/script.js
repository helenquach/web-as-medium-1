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

  document.querySelectorAll('nav a').forEach((link) => {
    link.addEventListener('mouseover', () => {
      cursor.classList.add('hover');
      cursor.classList.add('difference');
    });
    link.addEventListener('mouseout', () => {
      cursor.classList.remove('hover');
      cursor.classList.remove('difference');
    });
  });

  document.querySelectorAll('.explore-link').forEach((link) => {
    link.addEventListener('mouseover', () => {
      cursor.classList.add('hover');
      cursor.classList.add('difference');
    });
    link.addEventListener('mouseout', () => {
      cursor.classList.remove('hover');
      cursor.classList.remove('difference');
    });
  });

  window.addEventListener('mouseout', (e) => {
    if(e.clientY <= 0 || e.clientX <= 0 || (e.clientX >= window.innerWidth || e.clientY >= window.innerHeight)) {
      cursor.style.opacity = '0';
      initCursor = false;
    }
  });
});
