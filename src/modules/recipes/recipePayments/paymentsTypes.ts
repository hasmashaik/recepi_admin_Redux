export interface Payment {
  id: string
  orderId: string
  customerName: string
  amount: number
  paymentMethod: 'Credit Card' | 'Debit Card' | 'Net Banking' | 'UPI' | 'Cash on Delivery'
  status: 'Pending' | 'Completed' | 'Failed' | 'Refunded'
  transactionId: string
  paymentDate: string
  hotelName: string
}