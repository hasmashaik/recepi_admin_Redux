export interface Recipe {
  id: string
  name: string
  category: string
  price: number
  status: 'Active' | 'Inactive'
  description: string
  image: string
  chef: string
  rating: number
  createdAt: string
  hotelId?: string
}