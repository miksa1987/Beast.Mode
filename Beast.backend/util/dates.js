const moment = require('moment')

const getFetchDates = (dateString) => {
  console.log(dateString)
  const splittedDate = dateString.split('-')
    
  const startdate = new Date(
    Number(splittedDate[0]), 
    Number(splittedDate[1]) - 1, 
    Number(splittedDate[2]),
    Number(splittedDate[3]),
    Number(splittedDate[4]))
      
  const enddate = new Date(
    Number(splittedDate[0]), 
    Number(splittedDate[1]) - 1, 
    Number(splittedDate[2]),
    Number(splittedDate[3] + 5),
    Number(splittedDate[4]))

  return [ startdate, enddate ]
}

const getNewFetchDates = (date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1 // Months in date object start from 0
  const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  console.log(`${year}-${month}-${day} ${hours}:${minutes}:00`)
  const endDateString = moment(`${year}-${month}-${day} ${hours}:${minutes}:00`)
    .add(5, 'hours').format()
  
    const endDate = new Date(endDateString)

    return [ date, endDate ]
}

module.exports = { getFetchDates, getNewFetchDates }