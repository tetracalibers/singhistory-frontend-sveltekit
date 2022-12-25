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
  body?: unknown
  token?: string
}
const sendApi = async ({ path, method, body, token }: SendApiFnArgs) => {
  const endpoint = `${API_BASE_URL}${path.startsWith('/') ? path : '/' + path}`
  const headers: HeadersInit = {}
  headers['Content-Type'] = 'application/json'
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }
  const options: RequestInit = { mode: 'cors', headers, method }
  if (body) {
    options.body = JSON.stringify(body)
  }
  const response = await fetch(endpoint, options)
  const result: ApiResponse = await response.json()
  return result
}

export const get = async (path: string, token?: string) => {
  return sendApi({ path, method: 'GET', token })
}

export const post = async (path: string, body: unknown, token?: string) => {
  return sendApi({ path, method: 'POST', body, token })
}

export const patch = async (path: string, body: unknown, token?: string) => {
  return sendApi({ path, method: 'PATCH', body, token })
}
