const fs = require('fs')
const path = require('path')

const console = require('../../logger')

const chooseTemplate = ({ esm }) => (
  esm
    ? path.join(path.dirname(fs.realpathSync(__filename)), '../../assets/templates/setup-esm.js')
    : path.join(path.dirname(fs.realpathSync(__filename)), '../../assets/templates/setup.js')
)

exports.command = 'init'

exports.describe = 'create a js file with a named exported "setup" function'

exports.builder = {
  setupUri: {
    describe: 'uri where to create a js file with a named exported "setup" function',
    type: 'string',
    alias: 'su',
    default: './ct-setup.js'
  },
  esm: {
    describe: 'Use esm as the module loader on the template setup file',
    type: 'boolean',
    default: false
  }
}

exports.handler = (argv) =>
  fs.copyFile(
    chooseTemplate(argv),
    argv.setupUri,
    fs.constants.COPYFILE_FICLONE,
    (err) => {
      if (err) {
        console.error(err)
      }
      console.success(`Setup file generated at ${path.resolve(argv.setupUri)}`)
    }
  )

