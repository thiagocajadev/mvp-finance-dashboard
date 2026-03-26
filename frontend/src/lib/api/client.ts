import axios from 'axios'
import { env } from '@/lib/env'
import { toApiError } from './types'

export const client = axios.create({
  baseURL: env.API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

client.interceptors.response.use(
  (response) => response.data,
  (error: unknown) => Promise.reject(toApiError(error)),
)
