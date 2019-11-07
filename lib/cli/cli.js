const yargs = require('yargs')

const commands = require('./commands')

module.exports = () =>
  yargs
    .scriptName('rest-contract-tester')
    .command(commands.default)
    .command(commands.init)
    .argv

