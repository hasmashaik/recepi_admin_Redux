import React from 'react'
import PayoutsTable from '../components/PayoutsTable'
import Input from '../../../../components/UI/Input'
import Button from '../../../../components/UI/Button'
import { Search, Filter } from 'lucide-react'

const CreatorPayoutsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState('')
  const [statusFilter, setStatusFilter] = React.useState('')

  const handleSearch = () => {
    console.log('Search query:', searchQuery)
  }

  const handleFilter = () => {
    console.log('Status filter:', statusFilter)
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Creator Payouts</h1>
        <p className="text-gray-600 mt-1">Manage all creator payouts</p>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                type="search"
                placeholder="Search payouts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Completed">Completed</option>
              <option value="Failed">Failed</option>
            </select>
            <Button onClick={handleFilter}>
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="secondary" onClick={handleSearch}>
              Search
            </Button>
          </div>
        </div>
      </div>
      
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <PayoutsTable />
      </div>
    </div>
  )
}

export default CreatorPayoutsPage