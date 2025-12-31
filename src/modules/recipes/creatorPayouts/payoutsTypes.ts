export interface Payout {
  id: string
  creatorId: string
  creatorName: string
  creatorEmail: string
  period: string
  totalRecipes: number
  totalRevenue: number
  commissionRate: number
  payoutAmount: number
  status: 'Pending' | 'Processing' | 'Completed' | 'Failed'
  payoutDate: string
  dueDate: string
  bankAccount: string
  ifsc: string
}