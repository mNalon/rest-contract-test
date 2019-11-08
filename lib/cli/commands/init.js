exports.command = 'init'

exports.describe = 'create a js file with a named exported "setup" function'

exports.builder = {
  setupUri: {
    describe: 'uri where to create a js file with a named exported "setup" function',
    type: 'string',
    alias: 'su',
    default: './ct-setup.js'
  }
}

exports.handler = () => (console.log('Not implemented'))
