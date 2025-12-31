import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Hotel } from './hotelsTypes'

const initialState: Hotel[] = [
  {
    id: '1',
    name: 'Grand Plaza Hotel',
    address: '123 Main Street',
    city: 'Mumbai',
    state: 'Maharashtra',
    contact: '+91 9876543210',
    email: 'info@grandplaza.com',
    rating: 4.5,
    recipeCount: 7, // Updated: Now has 7 recipes
    status: 'Active',
    joinedAt: '2023-01-15',
  },
  {
    id: '2',
    name: 'Sunset Resort',
    address: '45 Beach Road',
    city: 'Goa',
    state: 'Goa',
    contact: '+91 9876543211',
    email: 'contact@sunsetresort.com',
    rating: 4.2,
    recipeCount: 6, // Updated: Now has 6 recipes
    status: 'Active',
    joinedAt: '2023-02-20',
  },
  {
    id: '3',
    name: 'Heritage Inn',
    address: '78 Heritage Lane',
    city: 'Jaipur',
    state: 'Rajasthan',
    contact: '+91 9876543212',
    email: 'hello@heritageinn.com',
    rating: 4.8,
    recipeCount: 7, // Updated: Now has 7 recipes
    status: 'Active',
    joinedAt: '2023-03-10',
  },
  {
    id: '4',
    name: 'Mountain View Lodge',
    address: '56 Hill Station Road',
    city: 'Manali',
    state: 'Himachal Pradesh',
    contact: '+91 9876543213',
    email: 'info@mountainview.com',
    rating: 4.3,
    recipeCount: 5, // Updated: Now has 5 recipes
    status: 'Inactive',
    joinedAt: '2023-04-05',
  },
  {
    id: '5',
    name: 'City Center Hotel',
    address: '90 Market Street',
    city: 'Bangalore',
    state: 'Karnataka',
    contact: '+91 9876543214',
    email: 'reservations@citycenter.com',
    rating: 4.0,
    recipeCount: 6, // Updated: Now has 6 recipes
    status: 'Active',
    joinedAt: '2023-05-12',
  },
]

const hotelsSlice = createSlice({
  name: 'hotels',
  initialState,
  reducers: {
    addHotel: (state, action: PayloadAction<Hotel>) => {
      state.push(action.payload)
    },
    updateHotel: (state, action: PayloadAction<Hotel>) => {
      const index = state.findIndex(hotel => hotel.id === action.payload.id)
      if (index !== -1) {
        state[index] = action.payload
      }
    },
    deleteHotel: (state, action: PayloadAction<string>) => {
      return state.filter(hotel => hotel.id !== action.payload)
    },
    toggleHotelStatus: (state, action: PayloadAction<string>) => {
      const hotel = state.find(hotel => hotel.id === action.payload)
      if (hotel) {
        hotel.status = hotel.status === 'Active' ? 'Inactive' : 'Active'
      }
    },
    updateHotelRecipeCount: (state, action: PayloadAction<{ hotelId: string; recipeCount: number }>) => {
      const hotel = state.find(hotel => hotel.id === action.payload.hotelId)
      if (hotel) {
        hotel.recipeCount = action.payload.recipeCount
      }
    },
  },
})

export const { addHotel, updateHotel, deleteHotel, toggleHotelStatus, updateHotelRecipeCount } = hotelsSlice.actions
export default hotelsSlice.reducer