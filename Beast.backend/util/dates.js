const moment = require('moment')

const getFetchDates = (dateString) => {
  const first = moment(dateString, 'YYYY-M-D-h-m').add(-15, 'hours')
  const second = moment(dateString, 'YYYY-M-D-h-m')
  
  const startdate = new Date(first.format())
  const enddate = new Date(second.format())
  
  return [ startdate, enddate ]
}

const getDateString = (date) => {
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  
  return `${year}-${month}-${day}-${hours}-${minutes}`
}

module.exports = { getFetchDates, getDateString }