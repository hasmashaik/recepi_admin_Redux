import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Payment } from './paymentsTypes'

const initialState: Payment[] = [
  {
    id: 'PAY001',
    orderId: 'ORD001',
    customerName: 'John Doe',
    amount: 850,
    paymentMethod: 'Credit Card',
    status: 'Completed',
    transactionId: 'TXN123456789',
    paymentDate: '2023-06-15',
    hotelName: 'Grand Plaza Hotel',
  },
  {
    id: 'PAY002',
    orderId: 'ORD002',
    customerName: 'Jane Smith',
    amount: 400,
    paymentMethod: 'UPI',
    status: 'Completed',
    transactionId: 'TXN123456790',
    paymentDate: '2023-06-16',
    hotelName: 'Sunset Resort',
  },
  {
    id: 'PAY003',
    orderId: 'ORD003',
    customerName: 'Robert Johnson',
    amount: 560,
    paymentMethod: 'Net Banking',
    status: 'Pending',
    transactionId: 'TXN123456791',
    paymentDate: '2023-06-17',
    hotelName: 'Heritage Inn',
  },
  {
    id: 'PAY004',
    orderId: 'ORD004',
    customerName: 'Emily Davis',
    amount: 880,
    paymentMethod: 'Debit Card',
    status: 'Failed',
    transactionId: 'TXN123456792',
    paymentDate: '2023-06-18',
    hotelName: 'Mountain View Lodge',
  },
  {
    id: 'PAY005',
    orderId: 'ORD005',
    customerName: 'Michael Wilson',
    amount: 360,
    paymentMethod: 'Cash on Delivery',
    status: 'Completed',
    transactionId: 'TXN123456793',
    paymentDate: '2023-06-19',
    hotelName: 'City Center Hotel',
  },
]

const paymentsSlice = createSlice({
  name: 'payments',
  initialState,
  reducers: {
    addPayment: (state, action: PayloadAction<Payment>) => {
      state.push(action.payload)
    },
    updatePayment: (state, action: PayloadAction<Payment>) => {
      const index = state.findIndex(payment => payment.id === action.payload.id)
      if (index !== -1) {
        state[index] = action.payload
      }
    },
    updatePaymentStatus: (state, action: PayloadAction<{ id: string; status: Payment['status'] }>) => {
      const payment = state.find(payment => payment.id === action.payload.id)
      if (payment) {
        payment.status = action.payload.status
      }
    },
    refundPayment: (state, action: PayloadAction<string>) => {
      const payment = state.find(payment => payment.id === action.payload)
      if (payment && payment.status === 'Completed') {
        payment.status = 'Refunded'
      }
    },
  },
})

export const { addPayment, updatePayment, updatePaymentStatus, refundPayment } = paymentsSlice.actions
export default paymentsSlice.reducer