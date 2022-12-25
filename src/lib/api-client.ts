const API_BASE_URL = 'http://localhost:3000'

type ApiMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE'

interface ApiResponse {
  statusCode: 409 | 500 | 201
  message: string
  data?: unknown
}

interface SendApiFnArgs {
  path: string
  method: ApiMethod
  body?: unknown
}
const sendApi = async ({ path, method, body }: SendApiFnArgs) => {
  const endpoint = `${API_BASE_URL}${path.startsWith('/') ? path : '/' + path}`
  const options: RequestInit = {
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    method
  }
  if (body) {
    options.body = JSON.stringify(body)
  }
  const response = await fetch(endpoint, options)
  const result: ApiResponse = await response.json()
  return result
}

export const get = async (path: string) => {
  return sendApi({ path, method: 'GET' })
}

export const post = async (path: string, body: unknown) => {
  return sendApi({ path, method: 'POST', body })
}

export const patch = async (path: string, body: unknown) => {
  return sendApi({ path, method: 'PATCH', body })
}
