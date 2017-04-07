var express = require('express')
var app = express()

app.get('/*', function (req, res) {
  var result = { unixTimestamp: null, naturalLanguageDate: null }
  var input = req.params[0]
  if (input) {
    if (!isNaN(input)) {
      var number = +input;
      if (number >= 0 && number <= 2147483647) {
        result.unixTimestamp = number;
        result.naturalLanguageDate = timeStampToDate(number)
      }
    } else {
      var re = /^[A-Za-z]+\s\d{1,2},\s\d{4}$/
      var date = Date.parse(input)
      if (input.match(re) && date) {
        result.unixTimestamp = date/1000
        result.naturalLanguageDate = timeStampToDate(date/1000)
      }
    }
  }
  res.send(result)
})

var timeStampToDate = function (num) {
  var date = new Date(num * 1000)
  var options = { year: 'numeric', month: 'long', day: 'numeric' }
  return date.toLocaleDateString('en-US', options)
}

var port = process.env.PORT || 8080
app.listen(port, function () {
  console.log('Server listening on port ' + port + '!')
})