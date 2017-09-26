var merge = require('webpack-merge')
var devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  API: '"http://ic-testit.azurewebsites.net"',
  PDF: '"https://pdfzin-testit.herokuapp.com/"'
})
