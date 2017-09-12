var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API: '"http://ic-testit.azurewebsites.net"',
  PDF: '"http://localhost:3000"'
})
