import { useExternalApi, type RequestBody } from './external-api'
const API_BASE_URL = 'http://localhost:3000'

type ApiMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE'

interface ApiResponse<T> {
  statusCode: 409 | 500 | 201
  message: string
  data?: T
}

interface SendApiFnArgs {
  path: string
  method: ApiMethod
  body?: RequestBody
  token?: string
}
const sendApi = async <T>({ path, method, body, token }: SendApiFnArgs) => {
  const headers: HeadersInit = {}
  if (token) headers['Authorization'] = `Bearer ${token}`
  const api = useExternalApi(API_BASE_URL, headers)
  const result = await api<ApiResponse<T>>(path, { method, body })
  return result
}

export const get = async <Data>(path: string, token?: string) => {
  return sendApi<Data>({ path, method: 'GET', token })
}

export const post = async <Data>(path: string, body: RequestBody, token?: string) => {
  return sendApi<Data>({ path, method: 'POST', body, token })
}

export const patch = async <Data>(path: string, body: RequestBody, token?: string) => {
  return sendApi<Data>({ path, method: 'PATCH', body, token })
}
