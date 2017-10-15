var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API: '"http://localhost:8080"',
  API: '"http://localhost:59927"',
  PDF: '"http://localhost:3000"'
})
