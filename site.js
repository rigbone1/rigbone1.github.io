function changeSlide(target) {
  const slide = document.getElementById(target)
  const activeSlide = document.querySelector('.Slide.active')
  const activeLink = document.querySelector('.SiteLink.active')

  if (activeSlide) {
    activeSlide.classList.remove('active')
  }

  if (activeLink) {
    activeLink.classList.remove('active')
  }

  slide.classList.add('active')
  document.querySelector(`[data-target="${target}"]`).classList.add('active')
}

function checkHistory() {
  const url = new URL(document.location.href)

  if (url.hash) {
    changeSlide(url.hash.slice(1))
  }
}

window.onload = e => {
  const links = document.querySelectorAll('.SiteLink')

  links.forEach(link => {
    link.onclick = e => {
      e.preventDefault()

      const target = link.dataset.target

      window.history.pushState(target, '', `#${target}`)
      changeSlide(target)
    }
  })
}

window.onpopstate = e => {
  checkHistory()
}