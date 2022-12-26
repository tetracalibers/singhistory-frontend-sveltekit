export type RequestBody = Record<string, string | number>
type ApiMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT'

const joinUrl = (baseUrl: string, path: string) => {
  const unslashUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl
  const unslashPath = path.startsWith('/') ? path.slice(1) : path
  return unslashUrl + '/' + unslashPath
}

const createUrlEncodedBody = (body: RequestBody) => {
  return Object.entries(body)
    .reduce((acc, [key, val]) => {
      return [...acc, encodeURIComponent(key) + '=' + encodeURIComponent(val)]
    }, [] as string[])
    .join('&')
}

interface SendApiOptions {
  method?: ApiMethod
  body?: RequestBody
  options?: Omit<RequestInit, 'body' | 'method' | 'headers'>
}

export const useExternalApi = (baseUrl: string, headers: HeadersInit = {}) => {
  const _headers = { 'Content-Type': 'application/json', ...headers }
  return async <Res>(
    path = '/',
    { options: _options, body, method = 'GET' }: SendApiOptions = {}
  ) => {
    const endpoint = joinUrl(baseUrl, path)
    const options: RequestInit = _options ?? {}
    options.method = method
    options.mode = options.mode ?? 'cors'
    options.headers = _headers
    if (options.method !== 'GET' && body) {
      switch (_headers['Content-Type']) {
        case 'application/json':
          options.body = JSON.stringify(body)
          break
        case 'application/x-www-form-urlencoded':
          options.body = createUrlEncodedBody(body)
          break
        default:
          break
      }
    }
    const response = await fetch(endpoint, options)
    const result: Res = await response.json()
    return result
  }
}
