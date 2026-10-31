document.addEventListener("DOMContentLoaded", () => {

  const cursor = document.querySelector('.cursor');
  const framesGrid = document.querySelector('.frames');
  const frameTemplate = document.querySelector('.template');

  let initCursor = false;
  let columns = 4;
  let sortBy = 'featured';
  let filterTag = 'none';

  /* Create frames */

  const frames = getCatFrames(sortCats(cats, sortBy), framesGrid, frameTemplate);

  /* End create frames */

  for (let i = columns-1; i < frames.length; i += columns) {
    frames[i].classList.add('right');
  }

  window.addEventListener('mousemove', (e) => {
    if (!initCursor) {
      cursor.style.opacity = '1';
      initCursor = true;
    }

    cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  });

  document.querySelectorAll('a').forEach((link) => {
    link.addEventListener('mouseover', () => {
      cursor.classList.add('hover');
    });
    link.addEventListener('mouseout', () => {
      cursor.classList.remove('hover');
    });
  });

  document.querySelectorAll('button').forEach((link) => {
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
  
  window.addEventListener('resize', () => {
    const frames = document.querySelectorAll('.frame');
    frames.forEach((frame) => {
      frame.classList.remove('right');
    });
    for (let i = columns-1; i < frames.length; i += columns) {
      frames[i].classList.add('right');
    }
  });

  // frames.forEach((frame) => {
  //   frame.addEventListener('mouseover', () => {
  //     const preview = frame.querySelector('.preview');
  //     frame.addEventListener('mousemove', e => {
  //       preview.style.setProperty('--mouse-x', `${e.clientX}px`);
  //       preview.style.setProperty('--mouse-y', `${e.clientY}px`);
  //     });
  //   });
  // })  

  document.querySelectorAll('.sort-button').forEach((sortButton) => {
      sortButton.addEventListener('click', () => {
        sortBy = sortButton.dataset.sort;
        framesGrid.innerHTML = '';
        const frames = getCatFrames(sortCats(cats, sortBy), framesGrid, frameTemplate);
        for (let i = columns-1; i < frames.length; i += columns) {
          frames[i].classList.add('right');
        }
        if (sortBy === 'featured') {
          framesGrid.classList.add('featured');
          frames.forEach((frame) => {
            frame.classList.add('featured');
          });
        } else {
          framesGrid.classList.remove('featured');
          frames.forEach((frame) => {
            frame.classList.remove('featured');
          });
        }
      });
    });
});


function getCatData(slug) {
  return cats.find((cat) => cat.slug === slug);
}

function filterCats(cats, filterTag) {
  if (filterTag !== 'none') {
    return cats.filter((cat) => cat.tags.includes(filterTag));
  } else {
    return cats;
  }
}

function sortCats(cats, sortBy) {
  switch (sortBy) {
    case 'featured':
      return cats;
    case 'dateAscending':
      return cats.toSorted((cat1, cat2) => parseInt(cat1.sortByDate) - parseInt(cat2.sortByDate));
    case 'dateDescending':
      return cats.toSorted((cat1, cat2) => parseInt(cat2.sortByDate) - parseInt(cat1.sortByDate));
  }
}

function getCatFrames(cats, frameDiv, template) {
  cats.forEach((cat) => {
    const catFrame = template.cloneNode(true);
    catFrame.id = cat.id;

    catFrame.addEventListener('mouseover', () => {
      const preview = catFrame.querySelector('.preview');
      catFrame.addEventListener('mousemove', e => {
        preview.style.setProperty('--mouse-x', `${e.clientX}px`);
        preview.style.setProperty('--mouse-y', `${e.clientY}px`);
      });
    });

    const catFrameLink = catFrame.querySelector('a');
    catFrameLink.href = `./cats/${cat.slug}.html`;

    const cursor = document.querySelector('.cursor');
    catFrameLink.addEventListener('mouseover', () => {
      cursor.classList.add('hover');
    });
    catFrameLink.addEventListener('mouseout', () => {
      cursor.classList.remove('hover');
    });

    const catFrameImg = catFrameLink.querySelector('img');
    catFrameImg.src = cat.previewImageSrc;
    // catFrameImg.alt = cat.title;

    catFrame.querySelector('.preview-title').textContent = cat.title;
    catFrame.querySelector('.preview-date').textContent = cat.date;
    catFrame.classList.remove('template');
    frameDiv.appendChild(catFrame);
  })
  return frameDiv.querySelectorAll('.frame');
}


/* DATA */

const cats = [
  {
    id: "herman-and-vermin",
    slug: "herman-and-vermin",
    title: "Herman and Vermin",
    date: "1945-1950",
    catName: "Herman, Vermin",
    sortByDate: "1945",
    author: "Frances Benjamin Johnston",
    source: "Library of Congress",
    tags: [],
    previewImageSrc: "./images/herman-and-vermin.png",
    description: "Lorem ipsum",
  },
  {
    id: "dunce",
    slug: "yes-i-am-a-dunce",
    title: "Yes, I am a dunce",
    date: "1911",
    catName: "Unknown",
    sortByDate: "1911",
    author: "Eulalie Osgood Grover",
    source: "N/A",
    tags: [],
    previewImageSrc: "./images/dunce.png",
    description: "Lorem ipsum",
  },
  {
    id: "military-cat",
    slug: "cat-sitting-in-chair-on-deck",
    title: "Cat sitting in chair on deck",
    date: "1920s",
    catName: "Unknown",
    sortByDate: "1920",
    author: "U.S.S. Relief",
    source: "Navy Medicine",
    tags: [],
    previewImageSrc: "./images/military-cat.png",
    description: "Lorem ipsum",
  },
  {
    id: "cat-dog-2",
    slug: "bridge-family-dog-and-cat",
    title: "Bridge family dog and cat viewing food bowl in Dade city",
    date: "c. 1920",
    catName: "Unknown",
    sortByDate: "1920",
    author: "Unknown",
    source: "State Library and Archives of Florida",
    tags: [],
    previewImageSrc: "./images/cat-dog-2.png",
    description: "Lorem ipsum",
  },
  {
    id: "cat-dog",
    slug: "cat-chasing-dog",
    title: "Cat chasing dog",
    date: "c. 1920",
    catName: "Unknown",
    sortByDate: "1920",
    author: "Unknown",
    source: "George Eastman Museum",
    tags: [],
    previewImageSrc: "./images/cat-dog.png",
    description: "Lorem ipsum",
  },
  {
    id: "christmas-cat",
    slug: "white-cat-beneath-christmas-tree",
    title: "White cat beneath a Christmas tree",
    date: "c. 1907",
    catName: "Unknown",
    sortByDate: "1907",
    author: "Jessie Tarbox Beals",
    source: "Schlesinger Library on the History of Women in America",
    tags: [],
    previewImageSrc: "./images/christmas-cat.png",
    description: "Lorem ipsum",
  },
  {
    id: "nurse-cat",
    slug: "kitty-nurse",
    title: "Kitty nurse",
    date: "1910-1924",
    catName: "Unknown",
    sortByDate: "1910",
    author: "Michael Zwerdling",
    source: "The National Library of Medicine",
    tags: [],
    previewImageSrc: "./images/nurse-cat.png",
    description: "Lorem ipsum",
  },
  {
    id: "brunnhilde",
    slug: "Brunnhilde",
    title: "Brünnhilde",
    date: "1936",
    catName: "Unknown",
    sortByDate: "1936",
    author: "Adolph Edward Weidhaas",
    source: "Library of Congress",
    tags: [],
    previewImageSrc: "./images/brunehilde.png",
    description: "Lorem ipsum",
  },
  {
    id: "first-cat",
    slug: "cat-drinking-from-a-bowl",
    title: "Cat drinking from a bowl",
    date: "1840-1860",
    catName: "Unknown",
    sortByDate: "1840",
    author: "Unknown",
    source: "Houghton Library",
    tags: [],
    previewImageSrc: "./images/first-cat.png",
    description: "Lorem ipsum",
  },
  {
    id: "cat-pair",
    slug: "pair-cats-sydney",
    title: "A pair of cats in Sydney",
    date: "1951",
    catName: "Unknown",
    sortByDate: "1951",
    author: "Ivan Ives",
    source: "State Library of New South Wales",
    tags: [],
    previewImageSrc: "./images/cat-pair.png",
    description: "Lorem ipsum",
  },
  {
    id: "edith-cats",
    slug: "two-cats-outside-home-edith-sodergran",
    title: "Two cats outside the home of Edith Södergran",
    date: "1920",
    catName: "Unknown",
    sortByDate: "1920",
    author: "Edith Södergran",
    source: "The Society of Swedish Literature in Finland",
    tags: [],
    previewImageSrc: "./images/edith-cats.png",
    description: "Lorem ipsum",
  },
  {
    id: "cat-doll",
    slug: "buzzer-the-cat",
    title: "Buzzer the cat lying on a chair next to a doll",
    date: "1911-1919",
    catName: "Buzzer",
    sortByDate: "1911",
    author: "Arnold Genthe",
    source: "Library of Congress",
    tags: [],
    previewImageSrc: "./images/cat-doll.png",
    description: "Lorem ipsum",
  },
  {
    id: "cat-basket-2",
    slug: "two-cats-and-a-basket",
    title: "Two cats and a basket",
    date: "c. 1903-1928",
    catName: "Unknown, Boy Blue",
    sortByDate: "1903",
    author: "Jessie Tarbox Beals",
    source: "Schlesinger Library on the History of Women in America",
    tags: [],
    previewImageSrc: "./images/cat-basket-2.png",
    description: "Lorem ipsum",
  },
  {
    id: "alley-cat",
    slug: "alley-cat",
    title: "Alley cat",
    date: "1948",
    catName: "Unknown",
    sortByDate: "1948",
    author: "Unknown",
    source: "Mitchell Library, State Library of New South Wales and Courtesy ACP Magazine Ltd.",
    tags: [],
    previewImageSrc: "./images/alley-cat.png",
    description: "Lorem ipsum",
  },
  {
    id: "cat-pair-2",
    slug: "pair-cats-sweden",
    title: "A pair of cats in Sweden",
    date: "1954",
    catName: "Unknown",
    sortByDate: "1954",
    author: "Unknown",
    source: "The National Archives of Norway",
    tags: [],
    previewImageSrc: "./images/cat-pair-2.png",
    description: "Lorem ipsum",
  },
  {
    id: "fluffy-cat",
    slug: "the-cat",
    title: "The Cat",
    date: "1916",
    catName: "Unknown",
    sortByDate: "1916",
    author: "Frank Eugune",
    source: "Library of Congress",
    tags: [],
    previewImageSrc: "./images/fluffy-cat.png",
    description: "Lorem ipsum",
  },
  {
    id: "hep",
    slug: "portrait-sam-donahue-hep",
    title: "Portrait of Sam Donahue and Hep",
    date: "1946",
    catName: "Hep",
    sortByDate: "1946",
    author: "Unknown",
    source: "Library of Congress",
    tags: [],
    previewImageSrc: "./images/hep.png",
    description: "Lorem ipsum",
  },
  {
    id: "window-cat",
    slug: "cat-sitting-on-a-window-ledge",
    title: "Cat sitting on a window ledge",
    date: "c. 1904-1905",
    catName: "Unknown",
    sortByDate: "1904",
    author: "Jessie Tarbox Beals",
    source: "Schlesinger Library on the History of Women in America",
    tags: [],
    previewImageSrc: "./images/window-cat.png",
    description: "Lorem ipsum",
  },
  {
    id: "bobbie",
    slug: "bobbie-the-cat",
    title: "A soldier's goodbye and Bobbie the cat",
    date: "c. 1939-1945",
    catName: "Bobbie",
    sortByDate: "1939",
    author: "Sam Hood",
    source: "State Library of New South Wales",
    tags: [],
    previewImageSrc: "./images/bobbie.png",
    description: "Lorem ipsum",
  },
  {
    id: "peta-cat",
    slug: "peta-the-cat",
    title: "Peta the office cat",
    date: "1964-1980",
    catName: "Peta",
    sortByDate: "1964",
    author: "Unknown",
    source: "The National Archives UK",
    tags: [],
    previewImageSrc: "./images/peta-cat.png",
    description: "Lorem ipsum",
  },
]