import { AxiosError } from 'axios'

export const getAxiosResponse = (error: unknown) => {
  const axiosError = error as AxiosError
  if (axiosError.response) {
    const errorData = axiosError.response.data as { detail?: string }
    return errorData.detail
  }
}
