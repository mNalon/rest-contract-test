const yargs = require('yargs/yargs')

const commands = require('./commands')

module.exports = () => {
  yargs()
    .scriptName('rest-contract-tester')
    .command(commands.default)
}
