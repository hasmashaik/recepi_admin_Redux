export interface Hotel {
  id: string
  name: string
  address: string
  city: string
  state: string
  contact: string
  email: string
  rating: number
  recipeCount: number
  status: 'Active' | 'Inactive'
  joinedAt: string
}