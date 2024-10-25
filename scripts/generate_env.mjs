/**
 * @fileoverview Environment File Generator
 *
 * This script generates environment configuration files for development and production
 * environments based on a template (.env.example). It performs the following tasks:
 *
 * 1. Copies the .env.example file to create .env.development and .env.production.
 * 2. Updates the content of these files with environment-specific configurations.
 * 3. Ensures proper file permissions and handles potential errors.
 *
 * Usage: Run this script from the project root directory.
 *
 * # Types:
 * ---
 * Configuration for environment files:
 * @typedef {Object} EnvFileConfig
 * @property {string} path - The file path.
 * @property {string} content - The file content.
 */

import fs from 'node:fs/promises'
import path from 'node:path'

import chalk from 'chalk'

const ROOT = process.cwd()
const ENV_SOURCE = path.resolve(ROOT, '.env.example')

/** @type {Record<string, EnvFileConfig>} */
const ENV_FILES = {
  development: {
    path: path.join(ROOT, '.env.development'),
    content: `
# Set the Node.js environment (production: for live deployment, development: for local development)
NODE_ENV=development

# Enable or disable bundle analysis (true/false)
ANALYZE=false

# Open bundle analyzer automatically after build (true/false)
OPEN_ANALYZER=false

# Set the mode for bundle analyzer output (static: HTML file, json: JSON file)
ANALYZER_MODE=static
    `.trim(),
  },
  production: {
    path: path.join(ROOT, '.env.production'),
    content: `
# Set the Node.js environment (production: for live deployment, development: for local development)
NODE_ENV=production

# Enable or disable bundle analysis (true/false)
ANALYZE=false

# Open bundle analyzer automatically after build (true/false)
OPEN_ANALYZER=false

# Set the mode for bundle analyzer output (static: HTML file, json: JSON file)
ANALYZER_MODE=static
    `.trim(),
  },
}

/**
 * Copies the source file to the destination and updates its content.
 *
 * @param {string} destination - The path of the destination file.
 * @param {string} content - The content to write to the file.
 * @returns {Promise<void>}
 */
async function copyFile(destination, content) {
  const prompt = chalk.bgBlue('[COPY]')

  try {
    await fs.copyFile(ENV_SOURCE, destination)
    console.info(prompt, chalk.blue(`${destination} created`))

    await fs.writeFile(destination, content)
    console.info(prompt, chalk.blue(`${destination} updated`))
  } catch (error) {
    console.error(chalk.red(`Error copying file to ${destination}`), error)
  }
}

/**
 * Checks if the source file is accessible for reading and writing.
 *
 * @param {string} source - The path of the source file.
 * @throws {Error} If the file is not accessible.
 */
async function checkSourceFileAccess(source) {
  try {
    await fs.access(source, fs.constants.R_OK | fs.constants.W_OK)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_error) {
    throw new Error("You don't have permission to read the .env.example file")
  }
}

/**
 * Main function to generate environment files.
 */
async function main() {
  try {
    await checkSourceFileAccess(ENV_SOURCE)

    const promises = Object.values(ENV_FILES).map(({ path, content }) => {
      return copyFile(path, content)
    })
    await Promise.all(promises)

    console.info(
      chalk.green('All environment files have been generated successfully.'),
    )
  } catch (error) {
    console.error(chalk.red('An error occurred:'), error.message)
    console.warn(chalk.yellow('Please check your file permissions.'))
    process.exit(-1)
  }
}

main().catch(error => {
  console.error(chalk.red('An unexpected error occurred:'), error)
  process.exit(-1)
})
