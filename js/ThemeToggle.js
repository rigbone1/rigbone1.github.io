class ThemeToggle extends HTMLElement {
  static get HTMLName() {
    return 'theme-toggle'
  }

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })

    const styles = this.#createStyles()
    const markup = this.#createMarkup()

    this.shadowRoot.append(styles, markup)
  }

  #createStyles() {
    const style = document.createElement('style')
    style.textContent = `
      :host {
        cursor: pointer;
        display: inline-block;
      }
  
      :host(:hover) {
        color: var(--link);
      }
      
      div {
        display: none;
      }
  
      svg {
        display: block;
        height: 2rem;
      }
  
      :host([dark]) #dark {
        display: block;
      }
  
      :host(:not([dark])) #light {
        display: block;
      }
    `
    return style
  }

  #createMarkup() {
    const fragment = new DocumentFragment()

    const light = document.createElement('div')
    light.id = 'light'
    light.innerHTML = `
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    `

    const dark = document.createElement('div')
    dark.id = 'dark'
    dark.innerHTML = `
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    `

    fragment.append(light,dark)
    return fragment
  }

  get theme() {
    return localStorage.theme ?? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  }

  connectedCallback() {
    if (this.theme === 'dark') {
      this.setAttribute('dark', '')
    }

    this.addEventListener('click', e => {
      if (this.theme === 'dark') {
        localStorage.theme = 'light'
        document.documentElement.classList.remove('dark')
        this.removeAttribute('dark')
      } else {
        localStorage.theme = 'dark'
        document.documentElement.classList.add('dark')
        this.setAttribute('dark', '')
      }
    })
  }
}

export default ThemeToggle