export const env = {
  // Em dev: string vazia → proxy do Vite lida com /api/v1
  // Em prod: URL completa da API via VITE_API_URL
  API_URL: import.meta.env.VITE_API_URL || '/api/v1',
} as const
