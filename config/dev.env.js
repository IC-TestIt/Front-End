var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
   API: '"http://ic-testit.azurewebsites.net"',
  //API: '"http://localhost:59927"',
  PDF: '"http://localhost:3000"'
})
