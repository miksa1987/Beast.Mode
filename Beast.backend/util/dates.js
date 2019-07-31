const moment = require('moment')

const getFetchDates = (dateString) => {
  const splittedDate = dateString.split('-')

  const startdate = new Date(
    Number(splittedDate[0]), 
    Number(splittedDate[1]) - 1, 
    Number(splittedDate[2]),
    Number(splittedDate[3]),
    Number(splittedDate[4]))
  
  const dates = getNewFetchDates(startdate, 10, 'days')
  const enddate = dates[1]
  return [ startdate, enddate ]
}

const getNewFetchDates = (date, howMuchToAdd, unit) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1 // Months in Date object start from 0
  const day = date.getDate()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  console.log(`${year}-${month}-${day} ${hours}:${minutes}:00`)
  const endDateString = moment([year, month, day, hours, minutes, 0, 0])
    .add(howMuchToAdd, unit).format()
  
    const endDate = new Date(endDateString)

    return [ date, endDate ]
}

module.exports = { getFetchDates, getNewFetchDates }