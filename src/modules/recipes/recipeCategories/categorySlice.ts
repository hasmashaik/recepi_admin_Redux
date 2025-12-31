import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Category } from './categoryTypes'

const initialState: Category[] = [
  {
    id: '1',
    name: 'Appetizers',
    description: 'Small dishes served before main course',
    recipeCount: 24,
    status: 'Active',
    createdAt: '2023-01-15',
  },
  {
    id: '2',
    name: 'Main Course',
    description: 'Primary dishes of a meal',
    recipeCount: 45,
    status: 'Active',
    createdAt: '2023-01-20',
  },
  {
    id: '3',
    name: 'Desserts',
    description: 'Sweet dishes served at the end of a meal',
    recipeCount: 32,
    status: 'Active',
    createdAt: '2023-02-10',
  },
  {
    id: '4',
    name: 'Beverages',
    description: 'Drinks and liquids',
    recipeCount: 18,
    status: 'Inactive',
    createdAt: '2023-02-15',
  },
  {
    id: '5',
    name: 'Salads',
    description: 'Cold dishes of mixed vegetables',
    recipeCount: 15,
    status: 'Active',
    createdAt: '2023-03-05',
  },
]

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<Category>) => {
      // Check if category already exists
      const existingIndex = state.findIndex(category => category.id === action.payload.id)
      if (existingIndex === -1) {
        state.push(action.payload)
      }
    },
    updateCategory: (state, action: PayloadAction<Category>) => {
      const index = state.findIndex(category => category.id === action.payload.id)
      if (index !== -1) {
        state[index] = action.payload
      }
    },
    toggleCategoryStatus: (state, action: PayloadAction<string>) => {
      const category = state.find(category => category.id === action.payload)
      if (category) {
        category.status = category.status === 'Active' ? 'Inactive' : 'Active'
      }
    },
  },
})

export const { addCategory, updateCategory, toggleCategoryStatus } = categorySlice.actions
export default categorySlice.reducer