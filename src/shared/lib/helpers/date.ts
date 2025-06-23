export const formatDate = (dateString: string | null): string | null => {
  if (!dateString) return null
  const date = new Date(dateString)
  return date.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

export const formatDateForInput = (dateString?: string) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toISOString().slice(0, 16)
}

export const dateStringToISO = (dateString: string | null): string | null => {
  if (!dateString) return null
  const [day, month, year] = dateString.split('.')
  const date = new Date(`${year}-${month}-${day}`)
  return date.toISOString()
}

export const ISOStringToDateString = (
  ISOString: string | undefined,
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

export const ISOStringToDateTimeString = (
  ISOString: string | undefined,
): string | null => {
  if (!ISOString) {
    return null
  }
  const date = new Date(ISOString)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')

  return `${day}.${month}.${year}, ${hours}:${minutes}`
}

export const isoToDateTimeLocal = (
  dateString: string | null,
): string | null => {
  console.log('isoToDateTimeLocal - input:', dateString)

  if (!dateString) {
    console.log('isoToDateTimeLocal - empty input, returning null')
    return null
  }

  try {
    const date = new Date(dateString)
    console.log('isoToDateTimeLocal - created date object:', date)

    // Проверяем, что дата валидна
    if (isNaN(date.getTime())) {
      console.log('isoToDateTimeLocal - invalid date, returning null')
      return null
    }

    const result = date.toISOString().slice(0, 16)
    console.log('isoToDateTimeLocal - result:', result)
    return result
  } catch (error) {
    console.error(
      'isoToDateTimeLocal - Error converting ISO to datetime-local:',
      error,
    )
    return null
  }
}

export const dateTimeLocalToIso = (
  dateString: string | null,
): string | null => {
  console.log('dateTimeLocalToIso - input:', dateString)

  if (!dateString) {
    console.log('dateTimeLocalToIso - empty input, returning null')
    return null
  }

  try {
    const date = new Date(dateString)
    console.log('dateTimeLocalToIso - created date object:', date)

    // Проверяем, что дата валидна
    if (isNaN(date.getTime())) {
      console.log('dateTimeLocalToIso - invalid date, returning null')
      return null
    }

    const result = date.toISOString()
    console.log('dateTimeLocalToIso - result:', result)
    return result
  } catch (error) {
    console.error('dateTimeLocalToIso - Error converting date to ISO:', error)
    return null
  }
}

export const formatToDateTime = (dateString: string) => {
  const date = new Date(dateString)
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')

  return `${day}.${month}.${year}, ${hours}:${minutes}`
}
