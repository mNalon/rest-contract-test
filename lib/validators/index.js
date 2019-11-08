const fs = require('fs')

const Ajv = require('ajv')
const isEmpty = require('lodash/isEmpty')
const head = require('lodash/head')

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

module.exports.schemaValidator = {
  isValidData: (data, schema) => {
    const ajv = new Ajv()
    const valid = ajv.validate(schema, data)
    if (!valid) {
      const error = head(ajv.errors)
      throw new Error(`${error.dataPath} -> ${error.message}`)
    }
  },
  isValidSchema: (schema) => {
    const ajv = new Ajv()
    const valid = ajv.validateSchema(schema)
    if (!valid) throw new Error(head(ajv.errors).message)
  }
}
