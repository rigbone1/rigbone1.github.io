const active = {
  link: null,
  slide: null,
}

function changeSlide(name) {
  const slide = document.querySelector(`[data-slide=${name}]`)

  if (!slide) {
    return;
  }

  if (active.link) {
    active.link.classList.remove('active')
  }
  
  if (active.slide) {
    active.slide.classList.remove('active')
  }

  active.link = document.querySelector(`[href='#${name}']`)
  active.slide = slide

  active.link.classList.add('active')
  active.slide.classList.add('active')
}

function checkHistory() {
  const url = new URL(document.location.href)

  if (!url.hash) {
    changeSlide('home')
  } else if (url.hash) {
    changeSlide(url.hash.slice(1))
  }
}

window.onload = e => {
  checkHistory()
}

window.onpopstate = e => {
  checkHistory()
}