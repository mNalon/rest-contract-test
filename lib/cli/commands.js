exports.default = {
  command: '$0',
  description: 'run test contract based on the setup returned by a callback defined on --setupCallbackFilePath',
  builder: (yargs) => (yargs),
  handler: (argv) => (console.log(`running with ${argv}`))
}

