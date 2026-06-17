import axios from 'axios'

const client = axios.create({ baseURL: '/api' })

client.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const api = {
  register: (data: { email: string; password: string; username: string; name: string }) =>
    client.post('/register', data),

  login: (data: { email: string; password: string }) =>
    client.post('/login', data),

  getMe: () => client.get('/me'),

  updateMe: (data: { name?: string; username?: string }) =>
    client.put('/me', data),

  getSubscription: () => client.get('/subscription'),

  createSubscription: (data: { planType: string }) =>
    client.post('/subscription', data),

  cancelSubscription: () => client.delete('/subscription'),
}

export const setAuthToken = (token: string) => localStorage.setItem('token', token)
export const getAuthToken = () => localStorage.getItem('token')
export const clearAuthToken = () => localStorage.removeItem('token')
