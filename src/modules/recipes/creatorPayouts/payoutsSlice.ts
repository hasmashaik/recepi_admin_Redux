import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Payout } from './payoutsTypes'

const initialState: Payout[] = [
  {
    id: 'POU001',
    creatorId: 'CR001',
    creatorName: 'Chef Ahmed',
    creatorEmail: 'ahmed@example.com',
    period: 'June 2023',
    totalRecipes: 12,
    totalRevenue: 45000,
    commissionRate: 10,
    payoutAmount: 4500,
    status: 'Completed',
    payoutDate: '2023-07-05',
    dueDate: '2023-07-10',
    bankAccount: '123456789012',
    ifsc: 'SBIN0001234',
  },
  {
    id: 'POU002',
    creatorId: 'CR002',
    creatorName: 'Chef Maria',
    creatorEmail: 'maria@example.com',
    period: 'June 2023',
    totalRecipes: 8,
    totalRevenue: 32000,
    commissionRate: 10,
    payoutAmount: 3200,
    status: 'Processing',
    payoutDate: '2023-07-06',
    dueDate: '2023-07-11',
    bankAccount: '234567890123',
    ifsc: 'ICIC0001234',
  },
  {
    id: 'POU003',
    creatorId: 'CR003',
    creatorName: 'Chef Robert',
    creatorEmail: 'robert@example.com',
    period: 'June 2023',
    totalRecipes: 15,
    totalRevenue: 58000,
    commissionRate: 10,
    payoutAmount: 5800,
    status: 'Pending',
    payoutDate: '',
    dueDate: '2023-07-12',
    bankAccount: '345678901234',
    ifsc: 'HDFC0001234',
  },
  {
    id: 'POU004',
    creatorId: 'CR004',
    creatorName: 'Chef Giovanni',
    creatorEmail: 'giovanni@example.com',
    period: 'May 2023',
    totalRecipes: 10,
    totalRevenue: 38000,
    commissionRate: 10,
    payoutAmount: 3800,
    status: 'Completed',
    payoutDate: '2023-06-05',
    dueDate: '2023-06-10',
    bankAccount: '456789012345',
    ifsc: 'PNB0001234',
  },
  {
    id: 'POU005',
    creatorId: 'CR005',
    creatorName: 'Chef Niran',
    creatorEmail: 'niran@example.com',
    period: 'June 2023',
    totalRecipes: 9,
    totalRevenue: 35000,
    commissionRate: 10,
    payoutAmount: 3500,
    status: 'Failed',
    payoutDate: '2023-07-07',
    dueDate: '2023-07-12',
    bankAccount: '567890123456',
    ifsc: 'UBIN0001234',
  },
]

const payoutsSlice = createSlice({
  name: 'payouts',
  initialState,
  reducers: {
    addPayout: (state, action: PayloadAction<Payout>) => {
      state.push(action.payload)
    },
    updatePayout: (state, action: PayloadAction<Payout>) => {
      const index = state.findIndex(payout => payout.id === action.payload.id)
      if (index !== -1) {
        state[index] = action.payload
      }
    },
    updatePayoutStatus: (state, action: PayloadAction<{ id: string; status: Payout['status'] }>) => {
      const payout = state.find(payout => payout.id === action.payload.id)
      if (payout) {
        payout.status = action.payload.status
      }
    },
    processPayout: (state, action: PayloadAction<{ id: string; payoutDate: string }>) => {
      const payout = state.find(payout => payout.id === action.payload.id)
      if (payout && payout.status === 'Pending') {
        payout.status = 'Processing'
        payout.payoutDate = action.payload.payoutDate
      }
    },
    completePayout: (state, action: PayloadAction<string>) => {
      const payout = state.find(payout => payout.id === action.payload)
      if (payout && payout.status === 'Processing') {
        payout.status = 'Completed'
        payout.payoutDate = new Date().toISOString().split('T')[0]
      }
    },
  },
})

export const { 
  addPayout, 
  updatePayout, 
  updatePayoutStatus, 
  processPayout, 
  completePayout 
} = payoutsSlice.actions
export default payoutsSlice.reducer