const fs = require('fs')
const path = require('path')

const cssPath = path.join(__dirname, '..', 'app', 'globals.css')

if (!fs.existsSync(cssPath)) {
  console.error('globals.css not found at', cssPath)
  process.exit(2)
}

const content = fs.readFileSync(cssPath, 'utf8')

// Check for a couple of expected selectors from the preview CSS
const checks = ['.radar-screen', '.scanline', '.cockpit-sidebar', 'radar-scan']
let missing = []
for (const c of checks) {
  if (!content.includes(c)) missing.push(c)
}

if (missing.length) {
  console.warn('Warning: globals.css is missing expected selectors:', missing.join(', '))
  process.exit(0)
}

console.log('globals.css contains expected preview selectors')
process.exit(0)
