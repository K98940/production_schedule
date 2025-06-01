export const getDateFormatted = (date: Date | string): string => {
  const d = new Date(date)

  if (isNaN(d.getTime())) {
    console.error('Invalid date:', date)
    return ''
  }

  const year = d.getFullYear()
  const month = d.getMonth()
  const day = d.getDate()
  return `${String(day).padStart(2, '0')}.${String(month + 1).padStart(2, '0')}.${year}`
}
