import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../app/store'
import Badge from '../../../../components/UI/Badge'
import Button from '../../../../components/UI/Button'
import Table from '../../../../components/UI/Table'
import { Eye, Edit, CheckCircle, PlayCircle } from 'lucide-react'

const PayoutsTable: React.FC = () => {
  const payouts = useSelector((state: RootState) => state.payouts)

  const handleView = (id: string) => {
    console.log('View payout:', id)
  }

  const handleEdit = (id: string) => {
    console.log('Edit payout:', id)
  }

  const handleProcess = (id: string) => {
    console.log('Process payout:', id)
  }

  const handleComplete = (id: string) => {
    console.log('Complete payout:', id)
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
      headers={['Payout ID', 'Creator', 'Period', 'Recipes', 'Revenue', 'Commission', 'Payout Amount', 'Status', 'Due Date', 'Actions']}
    >
      {payouts.map((payout) => (
        <tr key={payout.id} className="hover:bg-gray-50">
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
            {payout.id}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            <div>
              <div className="font-medium">{payout.creatorName}</div>
              <div className="text-gray-500">{payout.creatorEmail}</div>
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            {payout.period}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            {payout.totalRecipes}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            ₹{payout.totalRevenue.toLocaleString()}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            {payout.commissionRate}%
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            ₹{payout.payoutAmount.toLocaleString()}
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <Badge variant={getStatusVariant(payout.status)}>
              {payout.status}
            </Badge>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            {payout.dueDate}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleView(payout.id)}
              >
                <Eye className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleEdit(payout.id)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              {payout.status === 'Pending' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleProcess(payout.id)}
                >
                  <PlayCircle className="h-4 w-4" />
                </Button>
              )}
              {payout.status === 'Processing' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleComplete(payout.id)}
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

export default PayoutsTable