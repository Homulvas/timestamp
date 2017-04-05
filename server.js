var express = require('express')
var app = express()

app.get('/*', function (req, res) {
  var input = req.params[0]
  res.send(input)
})

app.listen(8080, function () {
  console.log('Server listening on port '+8080+'!')
})