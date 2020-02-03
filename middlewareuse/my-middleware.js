module.exports = {
	
	myLogger: function (name) {
		console.log(name);
	return function(req, res, next) {
		console.log('LOGGED' + name)
		next()
		}
	},

	requestTime: function(req, res, next) {
	req.requestTime = formatDate(new Date())
	next()
	}
}

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
