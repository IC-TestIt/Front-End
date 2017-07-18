var express = require('express')
var serveStatic = require('serve-static')

var app = express()
app.use(serveStatic(__dirname))

var port = process.env.PORT || 3000
app.listen(port)

console.log(`server started ${port}`)
