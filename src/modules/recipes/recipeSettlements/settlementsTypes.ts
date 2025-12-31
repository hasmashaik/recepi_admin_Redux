export interface Settlement {
  id: string
  hotelId: string
  hotelName: string
  period: string
  totalOrders: number
  totalRevenue: number
  commission: number
  settlementAmount: number
  status: 'Pending' | 'Processing' | 'Completed' | 'Failed'
  settlementDate: string
  dueDate: string
}