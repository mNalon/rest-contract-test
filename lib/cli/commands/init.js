exports.command = 'init'

exports.describe = 'create a js setup file that exports a sample callback'

exports.builder = {
  setupUri: {
    describe: 'uri where to create the setup file',
    type: 'string',
    alias: 'su',
    default: './ct-setup.js'
  }
}

exports.handler = () => (console.log('Not implemented'))
