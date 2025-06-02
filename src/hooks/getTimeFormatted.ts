export const getTimeFormatted = (date: Date | string): string => {
  const d = new Date(date)

  if (isNaN(d.getTime())) {
    console.error('Invalid date:', date)
    return ''
  }

  const hour = d.getHours().toString().padStart(2, '0')
  const minutes = d.getMinutes().toString().padStart(2, '0')
  return `${String(hour).padStart(2, '0')} : ${String(minutes).padStart(2, '0')}`
}
