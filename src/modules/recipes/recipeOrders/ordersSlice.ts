import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Order } from './ordersTypes'

const initialState: Order[] = [
  {
    id: 'ORD001',
    customerName: 'John Doe',
    customerEmail: 'john.doe@example.com',
    customerPhone: '+91 9876543210',
    items: [
      { recipeId: '1', recipeName: 'Chicken Biryani', quantity: 2, price: 250 },
      { recipeId: '3', recipeName: 'Grilled Salmon', quantity: 1, price: 350 },
    ],
    totalAmount: 850,
    status: 'Delivered',
    orderDate: '2023-06-15',
    deliveryDate: '2023-06-15',
    hotelId: '1',
    hotelName: 'Grand Plaza Hotel',
  },
  {
    id: 'ORD002',
    customerName: 'Jane Smith',
    customerEmail: 'jane.smith@example.com',
    customerPhone: '+91 9876543211',
    items: [
      { recipeId: '2', recipeName: 'Vegetable Pasta', quantity: 1, price: 180 },
      { recipeId: '4', recipeName: 'Mushroom Risotto', quantity: 1, price: 220 },
    ],
    totalAmount: 400,
    status: 'Preparing',
    orderDate: '2023-06-16',
    deliveryDate: '2023-06-16',
    hotelId: '2',
    hotelName: 'Sunset Resort',
  },
  {
    id: 'ORD003',
    customerName: 'Robert Johnson',
    customerEmail: 'robert.j@example.com',
    customerPhone: '+91 9876543212',
    items: [
      { recipeId: '5', recipeName: 'Thai Green Curry', quantity: 2, price: 280 },
    ],
    totalAmount: 560,
    status: 'Confirmed',
    orderDate: '2023-06-17',
    deliveryDate: '2023-06-17',
    hotelId: '3',
    hotelName: 'Heritage Inn',
  },
  {
    id: 'ORD004',
    customerName: 'Emily Davis',
    customerEmail: 'emily.d@example.com',
    customerPhone: '+91 9876543213',
    items: [
      { recipeId: '1', recipeName: 'Chicken Biryani', quantity: 1, price: 250 },
      { recipeId: '3', recipeName: 'Grilled Salmon', quantity: 1, price: 350 },
      { recipeId: '5', recipeName: 'Thai Green Curry', quantity: 1, price: 280 },
    ],
    totalAmount: 880,
    status: 'Pending',
    orderDate: '2023-06-18',
    deliveryDate: '2023-06-18',
    hotelId: '4',
    hotelName: 'Mountain View Lodge',
  },
  {
    id: 'ORD005',
    customerName: 'Michael Wilson',
    customerEmail: 'michael.w@example.com',
    customerPhone: '+91 9876543214',
    items: [
      { recipeId: '2', recipeName: 'Vegetable Pasta', quantity: 2, price: 180 },
    ],
    totalAmount: 360,
    status: 'Ready',
    orderDate: '2023-06-19',
    deliveryDate: '2023-06-19',
    hotelId: '5',
    hotelName: 'City Center Hotel',
  },
]

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<Order>) => {
      state.push(action.payload)
    },
    updateOrder: (state, action: PayloadAction<Order>) => {
      const index = state.findIndex(order => order.id === action.payload.id)
      if (index !== -1) {
        state[index] = action.payload
      }
    },
    updateOrderStatus: (state, action: PayloadAction<{ id: string; status: Order['status'] }>) => {
      const order = state.find(order => order.id === action.payload.id)
      if (order) {
        order.status = action.payload.status
      }
    },
    deleteOrder: (state, action: PayloadAction<string>) => {
      return state.filter(order => order.id !== action.payload)
    },
  },
})

export const { addOrder, updateOrder, updateOrderStatus, deleteOrder } = ordersSlice.actions
export default ordersSlice.reducer