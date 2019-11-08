const colors = require('colors/safe')

colors.setTheme({
  silly: 'rainbow',
  input: 'grey',
  verbose: 'cyan',
  prompt: 'grey',
  info: 'gray',
  data: 'grey',
  help: 'cyan',
  warn: 'yellow',
  debug: 'blue',
  error: 'red'
})

const generate = (type) => (txt) => console[type](colors[type](`${txt}`))

module.exports.log = (txt) => console.log(txt)
module.exports.info = (txt) => generate('info')(txt)
module.exports.error = (txt) => generate('error')(txt)
module.exports.warn = (txt) => generate('warn')(txt)

