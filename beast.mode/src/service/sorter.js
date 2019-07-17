const comparePostDates = (a, b) => {
  return new Date(b) - new Date(a)
}

export default { comparePostDates }