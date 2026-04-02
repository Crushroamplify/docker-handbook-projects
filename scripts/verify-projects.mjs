import { existsSync, readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const repoRoot = resolve(__dirname, '..')

const projects = [
  'hello-dock',
  'imgtool',
  'notes-api-node',
  'notes-api-go',
  'notes-api-python',
  'fullstack-notes-application',
  'llm-runtime-demo'
]

const requiredFiles = ['README.md', 'starter/README.md', 'completed/README.md']
const requiredSections = ['Prerequisites', 'Run Commands', 'Handbook Chapters', 'Layout']

const errors = []

for (const project of projects) {
  const projectDir = resolve(repoRoot, project)

  // Check required files exist
  for (const file of requiredFiles) {
    const filePath = resolve(projectDir, file)
    if (!existsSync(filePath)) {
      errors.push(`${project}: missing required file "${file}"`)
    }
  }

  // Check root README has required sections
  const readmePath = resolve(projectDir, 'README.md')
  if (existsSync(readmePath)) {
    const content = readFileSync(readmePath, 'utf8')
    for (const section of requiredSections) {
      if (!content.includes(section)) {
        errors.push(`${project}/README.md: missing required section "${section}"`)
      }
    }
  }
}

if (errors.length > 0) {
  console.error('Project verification FAILED:')
  for (const err of errors) {
    console.error(`  - ${err}`)
  }
  process.exit(1)
} else {
  console.log(`Project verification PASSED (${projects.length} projects checked)`)
}
