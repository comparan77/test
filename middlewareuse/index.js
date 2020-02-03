const express = require('express')
const app = express()
const port = 3000
// var middle = require('./my-middleware.js');
var logger = require('./logger.js');
var timmer = require('./timmer.js');
/*
var myLogger = function (req, res, next) {
	console.log('LOGGED')
	next()
}

var requestTime = function(req, res, next) {
	req.requestTime = formatDate(new Date())
	next()
}

app.use(myLogger);
app.use(requestTime);
*/

var requestTime = function(req, res, next) {
	req.requestTime = formatDate(new Date())
	next()
}
app.use(logger({name: 'gil'}))
app.use(timmer())

app.get('/', (req, res, next) => {
	var responseText = 'hola mundo!<br>'
	responseText += '<small>Requested at: ' + req.requestTime + '</small>'
	res.send(responseText)
})

/*
function formatDate(date) {
  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ]

  var day = date.getDate()
  var monthIndex = date.getMonth()
  var year = date.getFullYear()
	var hour = date.getHours()
	var minut = date.getMinutes()
	var second = date.getSeconds()
	var millisec = date.getMilliseconds()

  return day + ' ' + monthNames[monthIndex] + ' ' + year + ' At ' + hour + ':' + minut + ':' + second + ':' + millisec
}
*/
app.listen(port,()=>console.log(`Ejemplo app listening en el puerto ${port}`))
