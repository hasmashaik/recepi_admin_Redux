export interface Category {
  id: string
  name: string
  description: string
  recipeCount: number
  status: 'Active' | 'Inactive'
  createdAt: string
}