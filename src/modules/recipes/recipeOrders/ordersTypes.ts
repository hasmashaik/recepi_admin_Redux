export interface Order {
  id: string
  customerName: string
  customerEmail: string
  customerPhone: string
  items: {
    recipeId: string
    recipeName: string
    quantity: number
    price: number
  }[]
  totalAmount: number
  status: 'Pending' | 'Confirmed' | 'Preparing' | 'Ready' | 'Delivered' | 'Cancelled'
  orderDate: string
  deliveryDate: string
  hotelId: string
  hotelName: string
}