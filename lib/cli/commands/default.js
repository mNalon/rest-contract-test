exports.command = '$0'

exports.describe = 'run test contract based on the setup'

exports.builder = {
  setupUri: {
    describe: 'path to a js file that exports an async callback that will return a setup object',
    type: 'string',
    alias: 'su',
    demandOption: true
  }
}

exports.handler = (argv) => (console.dir(`running with ${argv.setupUri}`))
