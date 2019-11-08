const fs = require('fs')

const isEmpty = require('lodash/isEmpty')

module.exports.argValidator = {
  isNotEmpty: (argv) => (arg) => {
    if (isEmpty(argv[arg])) throw new Error(`Required argument "${arg}" is empty`)
    return argv
  },
  isValidFile: (argv) => (arg) => {
    if (!fs.existsSync(argv[arg])) throw new Error(`File "${argv[arg]}" not found`)
    return argv
  }
}

