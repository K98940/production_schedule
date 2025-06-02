export const formatTime = (milliseconds: number): string => {
  const totalSeconds = Math.floor(milliseconds / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const hours = Math.floor(minutes / 60)

  if (minutes < 60) {
    return `${minutes} мин.`
  }

  const remainingMinutes = minutes % 60
  const formattedMinutes = String(remainingMinutes).padStart(2, '0')

  return `${hours}ч : ${formattedMinutes}м`
}
