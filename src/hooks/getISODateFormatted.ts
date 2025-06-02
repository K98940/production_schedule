export const getISODateFormatted = (date: Date): string => {
  const timezoneOffset = date.getTimezoneOffset() * 60000
  const localTime = new Date(date.getTime() - timezoneOffset)

  return localTime
    .toISOString()
    .replace('Z', '')
    .replace(/(\.\d{3})\d+/, '$1')
}
