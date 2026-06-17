export interface User {
  userId: number
  email: string
  username: string
  name: string
}

export interface AuthResponse {
  token: string
  userId: number
  username: string
  name: string
  email: string
}

export interface Subscription {
  subscriptionId: number
  planType: 'basic' | 'premium' | 'elite'
  status: string
}

export interface Plan {
  id: 'basic' | 'premium' | 'elite'
  name: string
  price: number
  description: string
}
