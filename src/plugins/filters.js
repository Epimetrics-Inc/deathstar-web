import Vue from 'vue'

function formatDate (stringDate) {
  var date = new Date(stringDate)
  var monthNames = [
    'January', 'February', 'March',
    'April', 'May', 'June', 'July',
    'August', 'September', 'October',
    'November', 'December'
  ]

  var day = date.getDate()
  var monthIndex = date.getMonth()
  var year = date.getFullYear()

  return monthNames[monthIndex] + ' ' + day + ', ' + year
}

Vue.filter('longdate', function (value) {
  return formatDate(value)
})
