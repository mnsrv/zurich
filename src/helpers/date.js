export const formatDateForServer = (date = new Date()) => {
  const year = date.getFullYear()
  const month = getFullNumber(date.getMonth() + 1)
  const day = getFullNumber(date.getDate())

  return `${year}-${month}-${day}`
}

export const formatDateForClient = (dateFromServer) => {
  const date = new Date(dateFromServer)
  const year = date.getFullYear()
  const month = getFullNumber(date.getMonth() + 1)
  const day = getFullNumber(date.getDate())

  return `${day}.${month}.${year}`
}

const getFullNumber = (number) => {
  return (number<10?'0':'') + number
}
