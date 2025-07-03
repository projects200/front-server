const fs = require('fs')
const path = require('path')
const glob = require('glob')

const nonce = process.env.NEXT_PUBLIC_CSP_NONCE

if (!nonce) {
  console.error('CSP_NONCE environment variable is not set.')
  process.exit(1)
}

const buildDir = path.join(__dirname, '../out')
const htmlFiles = glob.sync(`${buildDir}/**/*.html`)

console.log(`Found ${htmlFiles.length} HTML files to process.`)
console.log(`Injecting nonce: ${nonce}`)

htmlFiles.forEach((file) => {
  try {
    let content = fs.readFileSync(file, 'utf8')
    const updatedContent = content.replace(/<script([^>]*)>/g, (match, p1) => {
      if (p1.includes('nonce=')) {
        return match
      }

      return `<script nonce="${nonce}"${p1}>`
    })

    if (content !== updatedContent) {
      fs.writeFileSync(file, updatedContent, 'utf8')
      console.log(`Successfully injected nonce into ${file}`)
    }
  } catch (error) {
    console.error(`Failed to process ${file}:`, error)
  }
})

console.log('Nonce injection complete for all script tags.')
