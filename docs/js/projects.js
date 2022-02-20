const projects = [
  {
    title: 'Image Cropper',
    description: 'A simple image cropping tool based on the <canvas> element.',
    links: {
      github: 'https://github.com/daveg1/image-cropper',
      website: 'https://daveg1.github.io/image-cropper/',
    }
  },
  {
    title: 'Dictionary App',
    description: 'A dictionary web app built with Vue and Vuex state management. Search for words, search by synonyms and (todo) add words to a locally saved favourites list.',
    links: {
        github: 'https://github.com/daveg1/dictionary-vue-app',
    }
  },
  {
    title: 'Minesweeper',
    description: 'A simple JavaScript minesweeper clone written with ES6 classes and bundled with webpack.',
    links: {
        github: 'https://github.com/daveg1/minesweeper',
        website: 'https://daveg1.github.io/minesweeper',
    },
  },
]

function githubLink(url) {
  return `
  <a href="${url}" class="button">
    <svg class="w-5 h-5 mr-1" aria-hidden="true" viewBox="0 0 16 16" fill="currentColor">
      <path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
    </svg>
    GitHub
  </a>`
}

function websiteLink(url) {
  return `
  <a href="${url}" class="button">
    <svg class="h-5 w-5 mr-1" aria-hidden="true" viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clip-rule="evenodd" />
    </svg>
    Website
  </a>`
}

export function loadProjects() {
  const list = document.getElementById('project-list')
  const template = document.querySelector('#project-item-template')
  const fragment = new DocumentFragment()

  for (const project of projects) {
    const item = template.content.cloneNode(true)
    item.querySelector('#title').textContent = project.title
    item.querySelector('#content').textContent = project.description

    const linksElem = item.querySelector('#links')

    if ('github' in project.links) {
      linksElem.innerHTML += githubLink(project.links.github)
    }

    if ('website' in project.links) {
      linksElem.innerHTML += websiteLink(project.links.website)
    }

    fragment.appendChild(item)
  }

  list.append(fragment)
}