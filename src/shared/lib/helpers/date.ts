export const formatDate = (dateString: string): string => {
  const date = new Date(dateString)

  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')

  return `${day}.${month}.${year}, ${hours}:${minutes}`
}

export const formatDateForInput = (dateString?: string) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toISOString().slice(0, 16)
}

export const dateStringToISO = (
  dateString: string | undefined,
): string | null => {
  if (!dateString) {
    return null
  }
  const [day, month, year] = dateString.split('.')
  const date = new Date(`${year}-${month}-${day}`)
  const isoDate = date.toISOString().split('T')[0]
  return isoDate
}

export const ISOStringToDateString = (
  ISOString: string | null,
): string | null => {
  if (!ISOString) {
    return null
  }
  const date = new Date(ISOString)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()

  return `${day}.${month}.${year}`
}

export const isoToDateTimeLocal = (isoString: string) => {
  if (!isoString) return ''
  const date = new Date(isoString)
  if (isNaN(date.getTime())) return ''

  const pad = (num: number) => num.toString().padStart(2, '0')

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`
}

export const dateTimeLocalToIso = (localString: string) => {
  if (!localString) return ''
  return new Date(localString).toISOString()
}
