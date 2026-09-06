export class ApiRequestError extends Error {
  status: number
  errors: unknown

  constructor(message: string, status: number, errors?: unknown) {
    super(message)
    this.name = 'ApiRequestError'
    this.status = status
    this.errors = errors
  }
}

const API_URL = (import.meta.env.VITE_API_URL ).replace(/\/$/, '')

type RequestOptions = Omit<RequestInit, 'body'> & { body?: BodyInit | Record<string, unknown> }

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { body, headers, ...init } = options
  const isFormData = body instanceof FormData
  const requestHeaders = new Headers(headers)

  if (body && !isFormData && !requestHeaders.has('Content-Type')) {
    requestHeaders.set('Content-Type', 'application/json')
  }

  let response: Response
  try {
    response = await fetch(`${API_URL}${path}`, {
      ...init,
      headers: requestHeaders,
      body: body && !isFormData ? JSON.stringify(body) : body as BodyInit | undefined,
      credentials: 'include',
    })
  } catch {
    throw new ApiRequestError('Backend se connect nahi ho paya. Server running hai ya nahi check karein.', 0)
  }

  const payload = await response.json().catch(() => null)
  if (!response.ok || !payload?.success) {
    throw new ApiRequestError(payload?.message || 'Request failed', response.status, payload?.errors)
  }

  return payload as T
}
