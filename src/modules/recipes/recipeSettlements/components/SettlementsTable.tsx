import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../app/store'
import Badge from '../../../../components/UI/Badge'
import Button from '../../../../components/UI/Button'
import Table from '../../../../components/UI/Table'
import { Eye, Edit, CheckCircle, PlayCircle } from 'lucide-react'

const SettlementsTable: React.FC = () => {
  const settlements = useSelector((state: RootState) => state.settlements)

  const handleView = (id: string) => {
    console.log('View settlement:', id)
  }

  const handleEdit = (id: string) => {
    console.log('Edit settlement:', id)
  }

  const handleProcess = (id: string) => {
    console.log('Process settlement:', id)
  }

  const handleComplete = (id: string) => {
    console.log('Complete settlement:', id)
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'success'
      case 'Pending':
        return 'warning'
      case 'Processing':
        return 'info'
      case 'Failed':
        return 'danger'
      default:
        return 'info'
    }
  }

  return (
    <Table
      headers={['Settlement ID', 'Hotel', 'Period', 'Orders', 'Revenue', 'Commission', 'Settlement Amount', 'Status', 'Due Date', 'Actions']}
    >
      {settlements.map((settlement) => (
        <tr key={settlement.id} className="hover:bg-gray-50">
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
            {settlement.id}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            {settlement.hotelName}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            {settlement.period}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            {settlement.totalOrders}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            ₹{settlement.totalRevenue.toLocaleString()}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            ₹{settlement.commission.toLocaleString()}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            ₹{settlement.settlementAmount.toLocaleString()}
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <Badge variant={getStatusVariant(settlement.status)}>
              {settlement.status}
            </Badge>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            {settlement.dueDate}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleView(settlement.id)}
              >
                <Eye className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleEdit(settlement.id)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              {settlement.status === 'Pending' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleProcess(settlement.id)}
                >
                  <PlayCircle className="h-4 w-4" />
                </Button>
              )}
              {settlement.status === 'Processing' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleComplete(settlement.id)}
                >
                  <CheckCircle className="h-4 w-4" />
                </Button>
              )}
            </div>
          </td>
        </tr>
      ))}
    </Table>
  )
}

export default SettlementsTable