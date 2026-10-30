document.addEventListener("DOMContentLoaded", () => {

  const cursor = document.querySelector('.cursor');
  const links = document.querySelectorAll('a');
  const frames = document.querySelectorAll('.frame');
  const previews = document.querySelectorAll('.preview');

  let initCursor = false;
  let columns = 4;

  for (let i = columns-1; i < frames.length; i += columns) {
    frames[i].classList.add('right');
  }

  window.addEventListener('mousemove', (e) => {
    if (!initCursor) {
      cursor.style.opacity = '1';
      initCursor = true;
    }

    const mouseY = e.clientY;
    const mouseX = e.clientX;
    const cursorHeight = cursor.offsetHeight;
    const offsetX = mouseX - cursorHeight / 2;
    const offsetY = mouseY - cursorHeight / 2;

    cursor.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0)`;
  });

  links.forEach((link) => {
    link.addEventListener('mouseover', () => {
      cursor.classList.add('hover');
    });
    link.addEventListener('mouseout', () => {
      cursor.classList.remove('hover');
    });
  });

  window.addEventListener('mouseout', () => {
    cursor.style.opacity = '0';
    initCursor = false;
  });

  frames.forEach((frame) => {
    frame.addEventListener('mouseover', () => {
      const preview = frame.querySelector('.preview');
      frame.addEventListener('mousemove', e => {
        preview.style.setProperty('--mouse-x', `${e.clientX}px`);
        preview.style.setProperty('--mouse-y', `${e.clientY}px`);
      });
    });
  })

  window.addEventListener('resize', () => {
    columns = 4;
    frames.forEach((frame) => {
      frame.classList.remove('right');
    });
    for (let i = columns-1; i < frames.length; i += columns) {
      frames[i].classList.add('right');
    }
  });
});