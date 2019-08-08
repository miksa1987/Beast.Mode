const comparePostDates = (a, b) => {
  return new Date(b.date) - new Date(a.date)
}

export default { comparePostDates }