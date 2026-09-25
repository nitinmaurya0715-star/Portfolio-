const username = 'nitinmaurya0715-star'

const fallbackProjects = [
  { name: 'Spotify-Clone', description: 'A Spotify-inspired music interface built as a practical web development project.', html_url: 'https://github.com/nitinmaurya0715-star/Spotify-Clone', language: 'JavaScript', stargazers_count: 0, forks_count: 0 },
  { name: 'calculator', description: 'A browser calculator created to practise JavaScript logic and user interactions.', html_url: 'https://github.com/nitinmaurya0715-star/calculator', language: 'JavaScript', stargazers_count: 0, forks_count: 0 },
  { name: 'Expense-Tracker', description: 'A practical project for recording and organising everyday expenses.', html_url: 'https://github.com/nitinmaurya0715-star/Expense-Tracker', language: 'JavaScript', stargazers_count: 0, forks_count: 0 },
  { name: 'Mood-Note', description: 'A simple note-taking project designed around capturing thoughts and moods.', html_url: 'https://github.com/nitinmaurya0715-star/Mood-Note', language: 'JavaScript', stargazers_count: 0, forks_count: 0 }
]

const grid = document.getElementById('projectGrid')
const status = document.getElementById('projectStatus')
const search = document.getElementById('projectSearch')
const menuButton = document.getElementById('menuButton')
const navLinks = document.getElementById('navLinks')
let repositories = []

function escapeHTML(value = '') {
  return value.replace(/[&<>'"]/g, character => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;' }[character]))
}

function readableName(name) {
  return name.replace(/[-_]/g, ' ').replace(/\b\w/g, letter => letter.toUpperCase())
}

function projectDescription(repo) {
  return repo.description || 'Public GitHub project. Add a short repository description on GitHub to display more detail here.'
}

function renderProjects(items) {
  if (!items.length) {
    grid.innerHTML = '<div class="empty-state">No repositories match this search.</div>'
    return
  }

  grid.innerHTML = items.map(repo => `
    <article class="project-card reveal visible">
      <div class="project-top">
        <span class="repo-icon" aria-hidden="true">⌘</span>
        <span class="project-language">${escapeHTML(repo.language || 'Repository')}</span>
      </div>
      <h3>${escapeHTML(readableName(repo.name))}</h3>
      <p>${escapeHTML(projectDescription(repo))}</p>
      <div class="project-meta">
        <span>★ ${repo.stargazers_count || 0}</span>
        <span>⑂ ${repo.forks_count || 0}</span>
      </div>
      <a class="project-link" href="${escapeHTML(repo.html_url)}" target="_blank" rel="noreferrer" aria-label="Open ${escapeHTML(repo.name)} on GitHub">View repository ↗</a>
    </article>
  `).join('')
}

async function loadProjects() {
  try {
    const endpoint = ['https:', '', 'api.github.com', 'users', username, 'repos'].join('/') + '?sort=updated&direction=desc&per_page=100'
    const response = await fetch(endpoint)
    if (!response.ok) throw new Error(`GitHub returned ${response.status}`)
    const data = await response.json()
    repositories = data.filter(repo => !repo.fork)
    status.textContent = `${repositories.length} public ${repositories.length === 1 ? 'repository' : 'repositories'}`
  } catch (error) {
    repositories = fallbackProjects
    status.textContent = 'Showing known projects · GitHub API unavailable'
    console.info('Using local project fallback:', error.message)
  }
  renderProjects(repositories)
}

search.addEventListener('input', event => {
  const query = event.target.value.trim().toLowerCase()
  const filtered = repositories.filter(repo => `${repo.name} ${repo.description || ''} ${repo.language || ''}`.toLowerCase().includes(query))
  renderProjects(filtered)
})

menuButton.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open')
  menuButton.setAttribute('aria-expanded', String(open))
  menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu')
})

document.querySelectorAll('.nav-links a').forEach(link => link.addEventListener('click', () => {
  navLinks.classList.remove('open')
  menuButton.setAttribute('aria-expanded', 'false')
}))

const sections = [...document.querySelectorAll('main section[id]')]
const navAnchors = [...document.querySelectorAll('.nav-links a')]
const activeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`))
    }
  })
}, { rootMargin: '-35% 0px -58%' })
sections.forEach(section => activeObserver.observe(section))

const revealTargets = document.querySelectorAll('.section-heading, .about-grid, .education-strip, .skills-list, .project-toolbar, .experience-list, .contact-card')
revealTargets.forEach(target => target.classList.add('reveal'))
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible')
      revealObserver.unobserve(entry.target)
    }
  })
}, { threshold: 0.12 })
revealTargets.forEach(target => revealObserver.observe(target))

loadProjects()
