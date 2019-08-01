const moment = require('moment')

const getFetchDates = (dateString) => {
  console.log(dateString)
  const first = moment(dateString, 'YYYY-M-D-H-m').add(-12, 'hours')
  const second = moment(dateString, 'YYYY-M-D-H-m')
  console.log(first.format('MMMM D, YYYY HH:mm:ss'))
  const startdate = new Date(first.format('MMMM D, YYYY HH:mm:ss'))
  const enddate = new Date(second.format('MMMM D, YYYY HH:mm:ss'))
  
  return [ startdate, enddate ]
}

const getDateString = (date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  
  return `${year}-${month}-${day}-${hours}-${minutes}`
}

module.exports = { getFetchDates, getDateString }