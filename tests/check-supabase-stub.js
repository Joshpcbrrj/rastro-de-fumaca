const fs = require('fs')
const path = require('path')

const clientPath = path.join(__dirname, '..', 'lib', 'supabase', 'client.ts')

if (!fs.existsSync(clientPath)) {
  console.error('supabase client.ts not found at', clientPath)
  process.exit(2)
}

const content = fs.readFileSync(clientPath, 'utf8')

if (content.includes('createNoopClient')) {
  console.log('Supabase client stub present')
  process.exit(0)
}

console.warn('Supabase client stub not detected; make sure client creation is guarded')
process.exit(0)
