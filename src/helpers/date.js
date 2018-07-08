export const formatDate = (date = new Date()) => {
  const year = date.getFullYear()
  const month = getFullNumber(date.getMonth() + 1)
  const day = getFullNumber(date.getDate())
  return `${year}-${month}-${day}`
}

const getFullNumber = (number) => {
  return (number<10?'0':'') + number
}
