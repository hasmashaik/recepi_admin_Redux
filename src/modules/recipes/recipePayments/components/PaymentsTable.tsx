import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../app/store'
import Badge from '../../../../components/UI/Badge'
import Button from '../../../../components/UI/Button'
import Table from '../../../../components/UI/Table'
import { Eye, Edit, RefreshCw } from 'lucide-react'

const PaymentsTable: React.FC = () => {
  const payments = useSelector((state: RootState) => state.payments)

  const handleView = (id: string) => {
    console.log('View payment:', id)
  }

  const handleEdit = (id: string) => {
    console.log('Edit payment:', id)
  }

  const handleRefund = (id: string) => {
    console.log('Refund payment:', id)
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'success'
      case 'Pending':
        return 'warning'
      case 'Failed':
        return 'danger'
      case 'Refunded':
        return 'info'
      default:
        return 'info'
    }
  }

  return (
    <Table
      headers={['Payment ID', 'Order ID', 'Customer', 'Amount', 'Method', 'Status', 'Payment Date', 'Actions']}
    >
      {payments.map((payment) => (
        <tr key={payment.id} className="hover:bg-gray-50">
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
            {payment.id}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            {payment.orderId}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            {payment.customerName}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            ₹{payment.amount}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            {payment.paymentMethod}
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <Badge variant={getStatusVariant(payment.status)}>
              {payment.status}
            </Badge>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            {payment.paymentDate}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleView(payment.id)}
              >
                <Eye className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleEdit(payment.id)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              {payment.status === 'Completed' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleRefund(payment.id)}
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              )}
            </div>
          </td>
        </tr>
      ))}
    </Table>
  )
}

export default PaymentsTable