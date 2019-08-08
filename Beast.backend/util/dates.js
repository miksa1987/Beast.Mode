const moment = require('moment')

let fetchInterval = -128

const setFetchInterval = (interval) => {
  fetchInterval = Number(interval)
  console.log(`fetchInterval set to ${fetchInterval}`)
}

const getFetchDates = (dateString) => {
  console.log(`fetch ${fetchInterval} hours`)
  const first = moment(dateString, 'YYYY-M-D-H-m').add(fetchInterval, 'hours')
  const second = moment(dateString, 'YYYY-M-D-H-m')
  const startdate = new Date(first.format('MMMM D, YYYY HH:mm:ss'))
  const enddate = new Date(second.format('MMMM D, YYYY HH:mm:ss'))
  
  return [ startdate, enddate ]
}

const getDate = (dateString) => {
  const date = moment(dateString, 'YYYY-M-D-H-m')
  return new Date(date.format('MMMM D, YYYY HH:mm:ss'))
}

const getDateString = (date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  
  return `${year}-${month}-${day}-${hours}-${minutes}`
}

// Returns true if first date is older
const isOlder = (date0, date1) => {
  const first = getDateString(date0)
  const second = getDateString(date1)

  return moment(first, 'YYYY-M-D-H-m').isBefore(moment(second, 'YYYY-M-D-H-m'))
}

module.exports = { setFetchInterval, fetchInterval, getFetchDates, getDateString, isOlder, getDate }