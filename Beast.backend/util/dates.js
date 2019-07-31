const moment = require('moment')

const getFetchDates = (dateString) => {
  const splittedDate = dateString.split('-')

  const startdate = new Date(moment([
    Number(splittedDate[0]), 
    Number(splittedDate[1]), 
    Number(splittedDate[2]),
    Number(splittedDate[3]),
    Number(splittedDate[4]), 0, 0]).add(-10, 'h').format())
  console.log(`startdate ${startdate}`)
  
  const enddate = new Date(moment([
    Number(splittedDate[0]), 
    Number(splittedDate[1]), 
    Number(splittedDate[2]),
    Number(splittedDate[3]),
    Number(splittedDate[4]), 0, 0]).format())
  console.log(`enddate ${enddate}`)
  
  return [ startdate, enddate ]
}

const getDateString = (date) => {
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  
  console.log(`${year}-${month}-${day}-${hours}-${minutes}`)
  return `${year}-${month}-${day}-${hours}-${minutes}`
}

module.exports = { getFetchDates, getDateString }