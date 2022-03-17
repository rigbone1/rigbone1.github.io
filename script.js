import ThemeToggle from './js/ThemeToggle.js'

window.onload = e => {
  console.log('Yo \u265E')
  customElements.define(ThemeToggle.HTMLName, ThemeToggle)
}