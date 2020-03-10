const { resolve } = require('path')

const isFunction = require('lodash/isFunction')
const fetch = require('node-fetch')

const { SETUP_SCHEMA } = require('../../schemas')
const { isNotEmpty, isValidFile } = require('../../validators').argValidator
const { isValidData, isValidSchema } = require('../../validators').schemaValidator
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

const validateSetup = async (setup) => {
  try {
    isValidData(setup, SETUP_SCHEMA)
  } catch (e) {
    throw new Error(`Invalid setup : ${e.message}`)
  }
  setup.endpointsToValidate.forEach((endpoint) => {
    try {
      isValidSchema(endpoint.schema)
    } catch (e) {
      throw new Error(`Invalid value to the schema for the path "${endpoint.path}": ${e.message}`)
    }
  })
  return setup
}

const validateEndpoints = async (setup) => {
  const { httpServer, endpointsToValidate } = setup
  return Promise.all(
    endpointsToValidate.map(
      ({ path, schema, headers }) =>
        fetch(`${httpServer}${path}`, { headers })
          .then((res) => res.json())
          .then((res) => isValidData(res, schema))
          .then(() => console.success(`${httpServer}${path}  OK`))
          .catch((err) => {
            console.error(`${httpServer}${path}`)
            throw err
          })
    )
  )
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
    .then(validateSetup)
    .then(validateEndpoints)
    .catch((err) => {
      console.error(err)
      process.exit(1)
    })
}

/* end module */
