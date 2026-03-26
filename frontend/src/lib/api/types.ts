import type { AxiosError } from 'axios'

export type ApiResponse<T> = {
  status: number
  action: string | null
  message: string
  data: T
}

export type ApiError = {
  status: number
  message: string
}

export function toApiError(error: unknown): ApiError {
  const axiosError = error as AxiosError<{ message: string }>

  if (axiosError.response) {
    return {
      status: axiosError.response.status,
      message: axiosError.response.data?.message ?? 'Erro desconhecido',
    }
  }

  return { status: 0, message: 'Sem conexão com o servidor' }
}
