const { resolve } = require('path')

const isFunction = require('lodash/isFunction')

const { isNotEmpty, isValidFile } = require('../../validators').argValidator
const console = require('../../logger')

const validateArgs = async (argv) =>
  isValidFile(isNotEmpty(argv)('setupUri'))('setupUri')

const loadSetup = async (argv) => {
  const setupUri = resolve(argv.setupUri)
  /* eslint-disable import/no-dynamic-require */
  console.info(`loading setup from ${setupUri}`)
  const {
    setup
  } = require(setupUri)

  if (!isFunction(setup)) {
    throw new Error(`There is no named exported function "setup" from ${setupUri}`)
  }

  return setup()
}

/* module */

exports.command = '$0'

exports.describe = 'run test contract based on the setup'

exports.builder = {
  setupUri: {
    describe: 'path to a js file that named exports a "setup" function',
    type: 'string',
    alias: 'su',
    demandOption: true
  }
}

exports.handler = (argv) => {
  validateArgs(argv)
    .then(loadSetup)
    .then(({ host }) => console.log(host))
    .catch((err) => {
      console.error(err)
      process.exit(1)
    })
}
