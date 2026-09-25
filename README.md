# Nitin Kumar Maurya — Simple Portfolio

A simple, clear, fully responsive portfolio made with HTML, CSS, and JavaScript.

## Run

No package installation is required.

Open `index.html` in a browser, or use VS Code Live Server.

For the most reliable GitHub project loading, run a local server:

```bash
python -m http.server 5500
```

Then open `http://localhost:5500`.

## Customise

### Profile photo
Replace `assets/profile-placeholder.svg` with your photo, then change this line in `index.html`:

```html
<img src="assets/profile-placeholder.svg" ...>
```

For example:

```html
<img src="assets/profile.jpg" ...>
```

### Resume
Add `resume.pdf` to the project folder. In `index.html`, replace the disabled resume button with:

```html
<a class="button button-secondary" href="resume.pdf" download>Download resume</a>
```

### GitHub projects
Projects are loaded automatically from the public GitHub API for `nitinmaurya0715-star`. If GitHub is unavailable or rate-limited, the known project fallback cards are displayed.

### LinkedIn
The supplied LinkedIn profile is already connected.

## Files

- `index.html` — semantic page structure
- `styles.css` — dark responsive design
- `script.js` — navigation, project loading, filtering, and reveal interactions
- `assets/profile-placeholder.svg` — replaceable photo placeholder
