import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Settlement } from './settlementsTypes'

const initialState: Settlement[] = [
  {
    id: 'SET001',
    hotelId: '1',
    hotelName: 'Grand Plaza Hotel',
    period: 'June 2023',
    totalOrders: 45,
    totalRevenue: 125000,
    commission: 12500,
    settlementAmount: 112500,
    status: 'Completed',
    settlementDate: '2023-07-05',
    dueDate: '2023-07-10',
  },
  {
    id: 'SET002',
    hotelId: '2',
    hotelName: 'Sunset Resort',
    period: 'June 2023',
    totalOrders: 32,
    totalRevenue: 95000,
    commission: 9500,
    settlementAmount: 85500,
    status: 'Processing',
    settlementDate: '2023-07-06',
    dueDate: '2023-07-11',
  },
  {
    id: 'SET003',
    hotelId: '3',
    hotelName: 'Heritage Inn',
    period: 'June 2023',
    totalOrders: 28,
    totalRevenue: 78000,
    commission: 7800,
    settlementAmount: 70200,
    status: 'Pending',
    settlementDate: '',
    dueDate: '2023-07-12',
  },
  {
    id: 'SET004',
    hotelId: '4',
    hotelName: 'Mountain View Lodge',
    period: 'May 2023',
    totalOrders: 25,
    totalRevenue: 65000,
    commission: 6500,
    settlementAmount: 58500,
    status: 'Completed',
    settlementDate: '2023-06-05',
    dueDate: '2023-06-10',
  },
  {
    id: 'SET005',
    hotelId: '5',
    hotelName: 'City Center Hotel',
    period: 'June 2023',
    totalOrders: 38,
    totalRevenue: 105000,
    commission: 10500,
    settlementAmount: 94500,
    status: 'Failed',
    settlementDate: '2023-07-07',
    dueDate: '2023-07-12',
  },
]

const settlementsSlice = createSlice({
  name: 'settlements',
  initialState,
  reducers: {
    addSettlement: (state, action: PayloadAction<Settlement>) => {
      state.push(action.payload)
    },
    updateSettlement: (state, action: PayloadAction<Settlement>) => {
      const index = state.findIndex(settlement => settlement.id === action.payload.id)
      if (index !== -1) {
        state[index] = action.payload
      }
    },
    updateSettlementStatus: (state, action: PayloadAction<{ id: string; status: Settlement['status'] }>) => {
      const settlement = state.find(settlement => settlement.id === action.payload.id)
      if (settlement) {
        settlement.status = action.payload.status
      }
    },
    processSettlement: (state, action: PayloadAction<{ id: string; settlementDate: string }>) => {
      const settlement = state.find(settlement => settlement.id === action.payload.id)
      if (settlement && settlement.status === 'Pending') {
        settlement.status = 'Processing'
        settlement.settlementDate = action.payload.settlementDate
      }
    },
    completeSettlement: (state, action: PayloadAction<string>) => {
      const settlement = state.find(settlement => settlement.id === action.payload)
      if (settlement && settlement.status === 'Processing') {
        settlement.status = 'Completed'
        settlement.settlementDate = new Date().toISOString().split('T')[0]
      }
    },
  },
})

export const { 
  addSettlement, 
  updateSettlement, 
  updateSettlementStatus, 
  processSettlement, 
  completeSettlement 
} = settlementsSlice.actions
export default settlementsSlice.reducer