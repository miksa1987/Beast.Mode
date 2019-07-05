const comparePostDates = (a, b) => {
  const date0 = new Date(a.date)
  const date1 = new Date(b.date)
  const d0 = date0.getFullYear() 
    + date0.getMonth() 
    + date0.getDate() 
    + date0.getHours() 
    + date0.getMinutes() 
    + date0.getSeconds() 
    + date0.getMilliseconds()
  const d1 = date1.getFullYear() 
    + date1.getMonth() 
    + date1.getDate() 
    + date1.getHours() 
    + date1.getMinutes() 
    + date1.getSeconds() 
    + date1.getMilliseconds()
  
  return d0 - d1
}

export default { comparePostDates }