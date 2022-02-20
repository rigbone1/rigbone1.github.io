import { checkHistory } from './history.js'
import { loadProjects } from './projects.js'

window.onload = e => {
  loadProjects()
  checkHistory()
}

window.onpopstate = e => {
  checkHistory()
}