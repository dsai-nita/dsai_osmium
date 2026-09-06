import { apiRequest } from './api'

type ApiResponse<T = any> = { success: true; message: string; data: T; pagination?: unknown }
type Query = Record<string, string | number | boolean | undefined>

const queryString = (query: Query = {}) => {
  const params = new URLSearchParams()
  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== '') params.set(key, String(value))
  })
  const result = params.toString()
  return result ? `?${result}` : ''
}

const resource = (path: string) => ({
  list: (query?: Query) => apiRequest<ApiResponse<any[]>>(`${path}${queryString(query)}`),
  get: (id: string) => apiRequest<ApiResponse<any>>(`${path}/${id}`),
  create: (body: FormData | Record<string, unknown>) => apiRequest<ApiResponse<any>>(path, { method: 'POST', body }),
  update: (id: string, body: FormData | Record<string, unknown>) => apiRequest<ApiResponse<any>>(`${path}/${id}`, { method: 'PUT', body }),
  delete: (id: string) => apiRequest<ApiResponse<null>>(`${path}/${id}`, { method: 'DELETE' }),
})

export const authApi = {
  register: (body: { name: string; email: string; password: string; branch?: string; year?: number }) =>
    apiRequest<ApiResponse<any>>('/auth/register', { method: 'POST', body }),
  login: (body: { email: string; password: string }) =>
    apiRequest<ApiResponse<any>>('/auth/login', { method: 'POST', body }),
  logout: () => apiRequest<ApiResponse<null>>('/auth/logout', { method: 'POST' }),
  me: () => apiRequest<ApiResponse<any>>('/auth/me'),
}

export const eventsApi = resource('/events')
export const projectsApi = resource('/projects')
export const membersApi = resource('/members')


export const galleryApi = {
  ...resource('/gallery'),
  deletePhotos: (id: string, photoPublicIds: string[]) =>
    apiRequest<ApiResponse<any>>(`/gallery/${id}/photos`, {
      method: 'DELETE',
      body: { photoPublicIds },
    }),
}
export const developersApi = resource('/developers')
export const foundersApi = resource('/founders')
export const adminEventsApi = eventsApi
export const adminProjectsApi = projectsApi
export const adminGalleryApi = galleryApi
export const adminUsersApi = membersApi
export const adminUserApi = resource('/members')


export const quizzesApi = {
  ...resource('/quizzes'),
  submit: (id: string, body: { answers: Array<{ questionId: string; selectedOption: number }>; timeTaken: number }) =>
    apiRequest<ApiResponse<any>>(`/quizzes/${id}/submit`, { method: 'POST', body }),
}
export const adminQuizApi = resource('/quizzes')

export const usersApi = {
  leaderboard: (query?: Query) =>
    apiRequest<ApiResponse<any[]>>(
      `/users/leaderboard${queryString(query)}`
    ),

  updateProfile: (body: FormData) =>
    apiRequest<ApiResponse<any>>("/auth/me", {
      method: "PATCH",
      body,
    }),
};
