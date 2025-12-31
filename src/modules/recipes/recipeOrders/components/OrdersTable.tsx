// import React, { useMemo, useState } from 'react'
// import { useSelector, useDispatch } from 'react-redux'
// import { RootState } from '../../../../app/store'
// import { deleteOrder, updateOrder } from '../ordersSlice'
// import Badge from '../../../../components/UI/Badge'
// import Button from '../../../../components/UI/Button'
// import Table from '../../../../components/UI/Table'
// import { Eye, Edit, Trash2, MoreVertical } from 'lucide-react'

// interface OrdersTableProps {
//   searchQuery: string
//   statusFilter: string
// }

// const OrdersTable: React.FC<OrdersTableProps> = ({ searchQuery, statusFilter }) => {
//   const orders = useSelector((state: RootState) => state.orders)
//   const dispatch = useDispatch()
//   const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
//   const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

//   const filteredOrders = useMemo(() => {
//     return orders.filter((order) => {
//       const matchesSearch = searchQuery === '' || 
//         order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         order.customerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         order.hotelName.toLowerCase().includes(searchQuery.toLowerCase())
      
//       const matchesStatus = statusFilter === '' || order.status === statusFilter
      
//       return matchesSearch && matchesStatus
//     })
//   }, [orders, searchQuery, statusFilter])

//   const showNotification = (message: string, type: 'success' | 'error') => {
//     setNotification({ message, type })
//     setTimeout(() => setNotification(null), 3000)
//   }

//   const handleView = (order: any) => {
//     console.log('View order:', order)
//     showNotification(`Viewing order: ${order.id}`, 'success')
//     setActiveDropdown(null)
//   }

//   const handleEdit = (order: any) => {
//     console.log('Edit order:', order)
//     showNotification(`Editing order: ${order.id}`, 'success')
//     setActiveDropdown(null)
//   }

//   const handleDelete = (id: string, customerName: string) => {
//     if (window.confirm(`Are you sure you want to delete order for "${customerName}"? This action cannot be undone.`)) {
//       dispatch(deleteOrder(id))
//       showNotification(`Order for ${customerName} deleted successfully`, 'success')
//       setActiveDropdown(null)
//     }
//   }

//   const toggleDropdown = (id: string) => {
//     setActiveDropdown(activeDropdown === id ? null : id)
//   }

//   const getStatusVariant = (status: string) => {
//     switch (status) {
//       case 'Delivered':
//         return 'success'
//       case 'Pending':
//         return 'warning'
//       case 'Cancelled':
//         return 'danger'
//       default:
//         return 'info'
//     }
//   }

//   return (
//     <div className="bg-white shadow rounded-lg overflow-hidden">
//       {/* Notification */}
//       {notification && (
//         <div className={`fixed top-4 right-4 z-50 flex items-center p-4 bg-white rounded-lg shadow-lg border-l-4 max-w-sm ${
//           notification.type === 'success' ? 'border-l-green-500' : 'border-l-red-500'
//         }`}>
//           {notification.type === 'success' ? (
//             <svg className="h-5 w-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//             </svg>
//           ) : (
//             <svg className="h-5 w-5 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           )}
//           <div className="flex-1">
//             <p className="text-sm font-medium text-gray-900">{notification.message}</p>
//           </div>
//           <button
//             onClick={() => setNotification(null)}
//             className="ml-4 text-gray-400 hover:text-gray-600"
//           >
//             <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           </button>
//         </div>
//       )}

//       {filteredOrders.length === 0 ? (
//         <div className="text-center py-12">
//           <div className="text-gray-500 text-lg mb-2">No orders found</div>
//           <div className="text-gray-400 text-sm">
//             Try adjusting your search or filter criteria
//           </div>
//         </div>
//       ) : (
//         <Table
//           headers={['Order ID', 'Customer', 'Hotel', 'Items', 'Total Amount', 'Status', 'Order Date', 'Actions']}
//         >
//           {filteredOrders.map((order) => (
//             <tr key={order.id} className="hover:bg-gray-50">
//               <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">
//                 {order.id}
//               </td>
//               <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
//                 <div>
//                   <div className="font-medium text-xs sm:text-sm">{order.customerName}</div>
//                   <div className="text-xs sm:text-sm text-gray-500">{order.customerEmail}</div>
//                 </div>
//               </td>
//               <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
//                 {order.hotelName}
//               </td>
//               <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
//                 {order.items.length} items
//               </td>
//               <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
//                 ₹{order.totalAmount}
//               </td>
//               <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
//                 <Badge variant={getStatusVariant(order.status)}>
//                   {order.status}
//                 </Badge>
//               </td>
//               <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
//                 {order.orderDate}
//               </td>
//               <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium">
//                 {/* Desktop: Show all buttons */}
//                 <div className="hidden sm:flex space-x-2">
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     onClick={() => handleView(order)}
//                     className="p-1.5 min-w-[32px] text-blue-600 border-blue-300 hover:bg-blue-50"
//                     title="View Details"
//                   >
//                     <Eye className="h-4 w-4" />
//                   </Button>
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     onClick={() => handleEdit(order)}
//                     className="p-1.5 min-w-[32px] text-green-600 border-green-300 hover:bg-green-50"
//                     title="Edit Order"
//                   >
//                     <Edit className="h-4 w-4" />
//                   </Button>
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     onClick={() => handleDelete(order.id, order.customerName)}
//                     className="p-1.5 min-w-[32px] text-red-600 border-red-300 hover:bg-red-50"
//                     title="Delete Order"
//                   >
//                     <Trash2 className="h-4 w-4" />
//                   </Button>
//                 </div>
                
//                 {/* Mobile: Dropdown menu */}
//                 <div className="sm:hidden relative">
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     onClick={() => toggleDropdown(order.id)}
//                     className="p-1.5 min-w-[32px]"
//                   >
//                     <MoreVertical className="h-4 w-4" />
//                   </Button>
                  
//                   {activeDropdown === order.id && (
//                     <div className="absolute right-0 top-full mt-1 w-36 bg-white border border-gray-200 rounded-md shadow-lg z-10">
//                       <button
//                         onClick={() => handleView(order)}
//                         className="flex items-center w-full px-3 py-2 text-xs text-blue-600 hover:bg-blue-50"
//                       >
//                         <Eye className="h-3 w-3 mr-2" />
//                         View Details
//                       </button>
//                       <button
//                         onClick={() => handleEdit(order)}
//                         className="flex items-center w-full px-3 py-2 text-xs text-green-600 hover:bg-green-50"
//                       >
//                         <Edit className="h-3 w-3 mr-2" />
//                         Edit Order
//                       </button>
//                       <button
//                         onClick={() => handleDelete(order.id, order.customerName)}
//                         className="flex items-center w-full px-3 py-2 text-xs text-red-600 hover:bg-red-50"
//                       >
//                         <Trash2 className="h-3 w-3 mr-2" />
//                         Delete Order
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </Table>
//       )}
//     </div>
//   )
// }

// export default OrdersTable


// modules/recipes/recipeOrders/components/OrdersTable.tsx
import React, { useMemo, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState } from '../../../../app/store'
import { deleteOrder, updateOrder } from '../ordersSlice'
import Badge from '../../../../components/UI/Badge'
import Button from '../../../../components/UI/Button'
import Table from '../../../../components/UI/Table'
import { Eye, Edit, Trash2, MoreVertical } from 'lucide-react' // Removed Hotel icon

interface OrdersTableProps {
  searchQuery: string
  statusFilter: string
}

const OrdersTable: React.FC<OrdersTableProps> = ({ searchQuery, statusFilter }) => {
  const orders = useSelector((state: RootState) => state.orders)
  const dispatch = useDispatch()
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch = searchQuery === '' || 
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.hotelName.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesStatus = statusFilter === '' || order.status === statusFilter
      
      return matchesSearch && matchesStatus
    })
  }, [orders, searchQuery, statusFilter])

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 3000)
  }

  const handleView = (order: any) => {
    console.log('View order:', order)
    showNotification(`Viewing order: ${order.id}`, 'success')
    setActiveDropdown(null)
  }

  const handleEdit = (order: any) => {
    console.log('Edit order:', order)
    showNotification(`Editing order: ${order.id}`, 'success')
    setActiveDropdown(null)
  }

  const handleDelete = (id: string, customerName: string) => {
    if (window.confirm(`Are you sure you want to delete order for "${customerName}"? This action cannot be undone.`)) {
      dispatch(deleteOrder(id))
      showNotification(`Order for ${customerName} deleted successfully`, 'success')
      setActiveDropdown(null)
    }
  }

  const toggleDropdown = (id: string) => {
    setActiveDropdown(activeDropdown === id ? null : id)
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'success'
      case 'Pending':
        return 'warning'
      case 'Cancelled':
        return 'danger'
      default:
        return 'info'
    }
  }

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 flex items-center p-4 bg-white rounded-lg shadow-lg border-l-4 max-w-sm ${
          notification.type === 'success' ? 'border-l-green-500' : 'border-l-red-500'
        }`}>
          {notification.type === 'success' ? (
            <svg className="h-5 w-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="h-5 w-5 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">{notification.message}</p>
          </div>
          <button
            onClick={() => setNotification(null)}
            className="ml-4 text-gray-400 hover:text-gray-600"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {filteredOrders.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg mb-2">No orders found</div>
          <div className="text-gray-400 text-sm">
            Try adjusting your search or filter criteria
          </div>
        </div>
      ) : (
        <Table
          headers={['Order ID', 'Customer', 'Hotel', 'Items', 'Total Amount', 'Status', 'Order Date', 'Actions']}
        >
          {filteredOrders.map((order) => (
            <tr key={order.id} className="hover:bg-gray-50">
              <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">
                {order.id}
              </td>
              <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                <div>
                  <div className="font-medium text-xs sm:text-sm">{order.customerName}</div>
                  <div className="text-xs sm:text-sm text-gray-500">{order.customerEmail}</div>
                </div>
              </td>
              <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                {/* Updated: Simple text link without icon */}
                <Link 
                  to={`/recipes/hotels/${order.hotelId}`}
                  className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                  title={`View ${order.hotelName} details`}
                >
                  {order.hotelName}
                </Link>
              </td>
              <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                {order.items.length} items
              </td>
              <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900 font-medium">
                ₹{order.totalAmount}
              </td>
              <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                <Badge variant={getStatusVariant(order.status)}>
                  {order.status}
                </Badge>
              </td>
              <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                {order.orderDate}
              </td>
              <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium">
                {/* Desktop: Show all buttons */}
                <div className="hidden sm:flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleView(order)}
                    className="p-1.5 min-w-[32px] text-blue-600 border-blue-300 hover:bg-blue-50"
                    title="View Details"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(order)}
                    className="p-1.5 min-w-[32px] text-green-600 border-green-300 hover:bg-green-50"
                    title="Edit Order"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(order.id, order.customerName)}
                    className="p-1.5 min-w-[32px] text-red-600 border-red-300 hover:bg-red-50"
                    title="Delete Order"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                
                {/* Mobile: Dropdown menu */}
                <div className="sm:hidden relative">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleDropdown(order.id)}
                    className="p-1.5 min-w-[32px]"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                  
                  {activeDropdown === order.id && (
                    <div className="absolute right-0 top-full mt-1 w-36 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                      <button
                        onClick={() => handleView(order)}
                        className="flex items-center w-full px-3 py-2 text-xs text-blue-600 hover:bg-blue-50"
                      >
                        <Eye className="h-3 w-3 mr-2" />
                        View Details
                      </button>
                      <Link
                        to={`/recipes/hotels/${order.hotelId}`}
                        className="flex items-center w-full px-3 py-2 text-xs text-indigo-600 hover:bg-indigo-50"
                        onClick={() => setActiveDropdown(null)}
                      >
                        <Eye className="h-3 w-3 mr-2" />
                        View Hotel
                      </Link>
                      <button
                        onClick={() => handleEdit(order)}
                        className="flex items-center w-full px-3 py-2 text-xs text-green-600 hover:bg-green-50"
                      >
                        <Edit className="h-3 w-3 mr-2" />
                        Edit Order
                      </button>
                      <button
                        onClick={() => handleDelete(order.id, order.customerName)}
                        className="flex items-center w-full px-3 py-2 text-xs text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-3 w-3 mr-2" />
                        Delete Order
                      </button>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </Table>
      )}
    </div>
  )
}

export default OrdersTable