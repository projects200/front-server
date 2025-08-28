const fs = require('fs')
const path = require('path')

const envPath = fs.existsSync(path.resolve(process.cwd(), '.env'))
  ? path.resolve(process.cwd(), '.env')
  : path.resolve(process.cwd(), '.env.local')
require('dotenv').config({ path: envPath })

const devSW = () => {
  const swFirebaseTemplate = fs.readFileSync(
    'src/firebase-messaging-sw.js',
    'utf8',
  )
  const swFirebaseWithEnv = swFirebaseTemplate.replace(
    /process\.env\.NEXT_PUBLIC_([A-Z_]+)/g,
    (match, varName) => `'${process.env[`NEXT_PUBLIC_${varName}`]}'`,
  )

  fs.writeFileSync('public/firebase-messaging-sw.js', swFirebaseWithEnv)

  fs.copyFileSync('src/sw.js', 'public/sw.js')
}

devSW()
