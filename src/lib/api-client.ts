import { useExternalApi, type RequestBody } from './external-api'
const API_BASE_URL = 'http://localhost:3000'

type ApiMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE'

interface ApiResponse {
  statusCode: 409 | 500 | 201
  message: string
  data?: Record<string, string>
}

interface SendApiFnArgs {
  path: string
  method: ApiMethod
  body?: RequestBody
  token?: string
}
const sendApi = async ({ path, method, body, token }: SendApiFnArgs) => {
  const headers: HeadersInit = {}
  if (token) headers['Authorization'] = `Bearer ${token}`
  const api = useExternalApi(API_BASE_URL, headers)
  const result = await api<ApiResponse>(path, { method, body })
  return result
}

export const get = async (path: string, token?: string) => {
  return sendApi({ path, method: 'GET', token })
}

export const post = async (path: string, body: RequestBody, token?: string) => {
  return sendApi({ path, method: 'POST', body, token })
}

export const patch = async (path: string, body: RequestBody, token?: string) => {
  return sendApi({ path, method: 'PATCH', body, token })
}
